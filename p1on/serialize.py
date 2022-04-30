import numpy as np
from typing import Any, Tuple

from p1on.color import getColorByName
from p1on.data import (
    ColorProperty,
    Graph,
    Interpolation,
    ScalarProperty,
    Path,
    VectorProperty )
from p1on.objects import Animatable, Label, Line, Sphere, Tube
from p1on.project import Camera, Project
import p1on.proto as proto

def serializeProject(project: Project) -> str:
    """
    Returns a string containing the serialized representation of the given
    project ready to be saved.
    """
    out = proto.Project()

    #fill meta
    out.meta.name = project.name
    if project.author is not None:
        out.meta.author = project.author
    if project.date is not None:
        out.meta.date.FromDatetime(project.date)

    #extra props
    if isinstance(project.clearColor, str):
        out.clearColor.CopyFrom(_serializeColor(getColorByName(project.clearColor)))
    else:
        out.clearColor.CopyFrom(_serializeColor(project.clearColor))
    if project.camera is not None:
        out.camera.CopyFrom(_serializeCamera(project.camera, project))

    #We'll fill missing names with '[type] [i]' ,e.g. Sphere 1
    nextSphereId = 1
    nextLineId = 1
    nextTubeId = 1
    nextLabelId = 1

    #animatables
    for a in project.animatables:
        if isinstance(a, Sphere):
            #fill name if not present
            if a.name is None:
                a.name = 'Sphere ' + str(nextSphereId)
                nextSphereId += 1
            out.spheres.append(_serializeSphere(a, project))
        elif isinstance(a, Line):
            if a.name is None:
                a.name = 'Line ' + str(nextLineId)
                nextLineId += 1
            out.lines.append(_serializeLine(a, project))
        elif isinstance(a, Tube):
            if a.name is None:
                a.name = 'Tube ' + str(nextTubeId)
                nextTubeId += 1
            out.tubes.append(_serializeTube(a, project))
        elif isinstance(a, Label):
            if a.name is None:
                a.name = 'Label ' + str(nextLabelId)
                nextLabelId += 1
            out.labels.append(_serializeLabel(a, project))
    
    #serialize data
    #Do this after serializing animatables as they might add implicit data
    out.graphs.extend(_serializeGraph(graph, i) for i, graph in enumerate(project.graphs))
    out.paths.extend(_serializePath(path, i) for i, path in enumerate(project.paths))

    #Fill time related stuff
    #We need to do this after we got all paths and graphs as we might have to
    #check them in order to get start and/or endTime
    if project.startTime is not None:
        out.meta.startTime = project.startTime
    else:
        inf = float('inf')
        startGraph = min((g.points[0].time for g in out.graphs if len(g.points) > 0), default=inf)
        startPath = min((p.points[0].time for p in out.paths if len(p.points) > 0), default=inf)
        start = min(startGraph, startPath)
        if start == inf:
            start = 0.0
        out.meta.startTime = start
    if project.endTime is not None:
        out.meta.endTime = project.endTime
    else:
        ninf = float('-inf')
        endGraph = max((g.points[-1].time for g in out.graphs if len(g.points) > 0), default=ninf)
        endPath = max((p.points[-1].time for p in out.paths if len(p.points) > 0), default=ninf)
        end = max(endGraph, endPath)
        if end == ninf:
            end = 0.0
        out.meta.endTime = end
    out.meta.speedRatio = project.speedRatio
    
    #ask protobuf to serialize
    return out.SerializeToString() #type: ignore[no-any-return]

def saveProject(project: Project, path: str) -> None:
    """
    Saves the project to the given file.
    """
    with open(path, 'wb') as f:
        f.write(serializeProject(project))

################################## Data ########################################

def _serializeInterpolation(i: Interpolation) -> proto.Interpolation:
    if i == 'step':
        return proto.Interpolation.STEP
    elif i == 'linear':
        return proto.Interpolation.LINEAR
    elif i == 'cubic':
        return proto.Interpolation.CUBIC
    else:
        raise ValueError('Illegal Interpolation')

def _serializeGraph(graph: Graph, id: int) -> proto.Graph:
    result = proto.Graph()
    #meta
    result.name = graph.name
    result.id = id
    result.interpolation = _serializeInterpolation(graph.interpolation)
    #data - sorted by time
    a = np.array(graph.array, dtype=np.float64)
    a = a[a[:,0].argsort()]
    #serialize array
    for row in a:
        point = result.points.add()
        point.time = row[0]
        point.value = row[1]
    #done
    return result

def _serializePath(path: Path, id: int) -> proto.Path:
    result = proto.Path()
    #meta
    result.name = path.name
    result.id = id
    result.interpolation = _serializeInterpolation(path.interpolation)
    #data - sorted by time
    a = np.array(path.array, dtype=np.float64)
    a = a[a[:,0].argsort()]
    #serialize array
    for row in a:
        point = result.points.add()
        point.time = row[0]
        point.position.x, point.position.y, point.position.z = row[1:]
    #done
    return result

def _serializeColor(color: Tuple[Any, ...]) -> proto.Color:
    result = proto.Color()
    if isinstance(color, tuple) and len(color) == 3:
        result.r = float(color[0])
        result.g = float(color[1])
        result.b = float(color[2])
    else:
        raise ValueError('Invalid color tuple')
    return result


################################ Properties ####################################

def _serializeScalarProperty(
    scalar: ScalarProperty,
    name: str,
    project: Project
) -> proto.ScalarProperty:
    result = proto.ScalarProperty()
    if isinstance(scalar, float):
        #const value
        result.constValue = scalar
    elif isinstance(scalar, Graph):
        #graph -> check if already present in project
        #      -> Either fetch graph id or add graph
        if scalar in project.graphs:
            id = project.graphs.index(scalar)
            result.graphId = id
        else:
            id = len(project.graphs)
            project.graphs.append(scalar)
            result.graphId = id
    else:
        #scalar is path like, but not a graph -> create a new graph
        id = len(project.graphs)
        project.graphs.append(Graph(scalar, name))
        result.graphId = id
    return result

def _serializeVectorProperty(
    vector: VectorProperty,
    name: str,
    project: Project
) -> proto.VectorProperty:
    result = proto.VectorProperty()
    if isinstance(vector, tuple) and len(vector) == 3:
        #const value
        result.constValue.x = vector[0]
        result.constValue.y = vector[1]
        result.constValue.z = vector[2]
    elif isinstance(vector, Path):
        #Check if already present in project
        # -> Either fetch path id or add path
        if vector in project.paths:
            id = project.paths.index(vector)
            result.pathId = id
        else:
            id = len(project.paths)
            project.paths.append(vector)
            result.pathId = id
    else:
        #path like, but not a path -> create new path
        id = len(project.paths)
        project.paths.append(Path(vector, name))
        result.pathId = id
    return result

def _serializeColorProperty(
    color: ColorProperty,
    name: str,
    project: Project
) -> proto.ColorProperty:
    result = proto.ColorProperty()
    if isinstance(color, str):
        #lookup color
        result.constValue.CopyFrom(_serializeColor(getColorByName(color)))
    elif isinstance(color, tuple):
        result.constValue.CopyFrom(_serializeColor(color))
    elif isinstance(color, Graph):
        #graph -> check if already present in project
        #      -> Either fetch graph id or add graph
        if color in project.graphs:
            id = project.graphs.index(color)
            result.graphId = id
        else:
            id = len(project.graphs)
            project.graphs.append(color)
            result.graphId = id
    else:
        #color is graph like, but not a graph -> create a new graph
        id = len(project.graphs)
        project.graphs.append(Graph(color, name))
        result.graphId = id
    return result

def _serializeCamera(camera: Camera, project: Project) -> proto.Camera:
    result = proto.Camera()
    if camera.position is not None:
        result.position.CopyFrom(_serializeVectorProperty(
            camera.position, 'camera_position', project))
    if camera.target is not None:
        result.target.CopyFrom(_serializeVectorProperty(
            camera.target, 'camera_target', project))
    return result

################################## Objects #####################################

def _writeObjectMeta(target, meta: Animatable, project: Project) -> None: #type: ignore[no-untyped-def]
    assert(meta.name is not None)
    target.name = meta.name
    if meta.description is not None:
        target.description = meta.description
    target.isVisible = meta.visible
    target.color.CopyFrom(_serializeColorProperty(meta.color, meta.name + '_color', project))

def _serializeSphere(sphere: Sphere, project: Project) -> proto.Sphere:
    result = proto.Sphere()
    assert(sphere.name is not None)
    _writeObjectMeta(result, sphere, project)
    #properties
    if sphere.position is not None:
        result.position.CopyFrom(_serializeVectorProperty(sphere.position, sphere.name + '_position', project))
    result.radius.CopyFrom(_serializeScalarProperty(sphere.radius, sphere.name + '_radius', project))
    #done
    return result

def _serializeTube(tube: Tube, project: Project) -> proto.Tube:
    result = proto.Tube()
    #meta
    assert(tube.name is not None)
    _writeObjectMeta(result, tube, project)
    #properties
    result.radius.CopyFrom(_serializeScalarProperty(tube.radius, tube.name + '_radius', project))
    result.isGrowing = tube.isGrowing
    #path
    if isinstance(tube.path, Path):
        #Check if already present in project
        # -> Either fetch path id or add path
        if tube.path in project.paths:
            id = project.paths.index(tube.path)
            result.pathId = id
        else:
            id = len(project.paths)
            project.paths.append(tube.path)
            result.pathId = id
    else:
        #path like, but not a path -> create new path
        id = len(project.paths)
        project.paths.append(Path(tube.path, tube.name + '_path'))
        result.pathId = id
    #done
    return result

def _serializeLine(line: Line, project: Project) -> proto.Line:
    result = proto.Line()
    assert(line.name is not None)
    _writeObjectMeta(result, line, project)
    #properties
    if line.start is not None:
        result.start.CopyFrom(_serializeVectorProperty(
            line.start, line.name + '_start', project))
    if line.end is not None:
        result.end.CopyFrom(_serializeVectorProperty(
            line.end, line.name + '_end', project))
    result.lineWidth.CopyFrom(_serializeScalarProperty(
        line.linewidth, line.name + '_lineWidth', project))
    if line.headSize is not None:
        result.headSize.CopyFrom(_serializeScalarProperty(
            line.headSize, line.name + '_headSize', project))
    #done
    return result

def _serializeLabel(label: Label, project: Project) -> proto.Label:
    result = proto.Label()
    assert(label.name is not None)
    _writeObjectMeta(result, label, project)
    #properties
    if label.position is not None:
        result.position.CopyFrom(_serializeVectorProperty(
            label.position, label.name + '_position', project))
    if label.fontSize is not None:
        result.fontSize.CopyFrom(_serializeScalarProperty(
            label.fontSize, label.name + '_fontSize', project))
    result.background.CopyFrom(_serializeColorProperty(
        label.background, label.name + '_background', project))
    #done
    return result

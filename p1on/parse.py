from typing import Dict, Optional, Tuple
import numpy as np

from p1on.objects import Label, Line, Sphere, Tube
from p1on.data import (
    ColorMap,
    ColorProperty,
    Graph,
    ScalarProperty,
    Path, PathLike,
    VectorProperty )
from p1on.project import Camera, Project
import p1on.proto as proto

def parseProjectFromString(data: str) -> Project:
    """
    Parses the project from the given string and returns the loaded project
    """
    #ask protobuf to parse string
    project = proto.Project()
    project.parseFromString(data)
    result = Project()

    #load meta (fills blank values with default values)
    result.name = project.meta.name
    result.author = project.meta.author
    result.date = project.meta.date.ToDateTime() if project.meta.HasField('date') else None

    #load time stuff
    result.startTime = project.meta.startTime
    result.endTime = project.meta.endTime
    result.speedRatio = project.meta.speedRatio

    #load data; keep ids for later referencing in the properties
    _graphs = dict(_parseGraph(g) for g in project.graphs)
    result.graphs = list(_graphs.values())
    _paths = dict(_parsePath(p) for p in project.paths)
    result.paths = list(_paths.values())

    #parse animatables
    result.animatables = []
    result.addAnimatables(_parseSphere(s, _graphs, _paths) for s in project.spheres)
    result.addAnimatables(_parseTube(t, _graphs, _paths) for t in project.tubes)
    result.addAnimatables(_parseLine(l, _graphs, _paths) for l in project.lines)
    result.addAnimatables(_parseLabel(l, _graphs, _paths) for l in project.labels)

    #additional properties
    if project.HasField('clearColor'):
        c = project.clearColor
        result.clearColor = (c.r, c.g, c.b)
    if project.HasField('camera'):
        result.camera = _parseCamera(project.camera, _paths)
    if project.HasField('colormap'):
        result.colormap = _parseColormap(project.colormap)

    #done
    return result

def parseProjectFromFile(path: str) -> Project:
    """
    Loads a project from the given file and returns it.
    """
    with open(path, 'rb') as f:
        return parseProjectFromFile(f.read()) #type: ignore[arg-type]

################################## Data ########################################

def _parseGraph(graph: proto.Graph) -> Tuple[int, Graph]:
    #meta
    name = graph.name
    #data
    array = np.empty((len(graph.points),2), dtype=np.float64)
    for i, point in enumerate(graph.points):
        array[i] = point.time, point.value
    #done -> return id value tuple to allow constructing a dict
    return (graph.id, Graph(array, name))

def _parsePath(path: proto.Path) -> Tuple[int, Path]:
    #meta
    name = path.name
    #data
    array = np.empty((len(path.points),4))
    for i, point in enumerate(path.points):
        array[i] = point.time, point.x, point.y, point.z
    #done -> return id value tuple to allow constructing a dict
    return (path.id, Path(array, name))

def _parseColormap(colormap: proto.ColorMap) -> ColorMap:
    cmap = np.empty((len(colormap.stops),5))
    for i, stop in enumerate(colormap.stops):
        cmap[i] = stop.value, stop.color.r, stop.color.g, stop.color.b, stop.color.a
    return cmap

def _parseCamera(camera: proto.Camera, pathDict: Dict[int, Path]) -> Camera:
    position = _parseVectorProperty(camera.position, pathDict, True)
    target = _parseVectorProperty(camera.target, pathDict, True)
    return Camera(position=position, target=target)

################################ Properties ####################################

def _parseScalarProperty(
    p: proto.ScalarProperty,
    graphDict: Dict[int, Graph],
    optional: bool
) ->  Optional[ScalarProperty]:
    if p.HasField('graphId'):
        #fetch referenced graph
        if p.graphId in graphDict:
            return graphDict[p.graphId]
        else:
            #referenced graph does not exist -> return empty one
            return np.empty((0,2))
    elif p.HasField('constValue'):
        return p.constValue #type: ignore[no-any-return]
    elif optional:
        #not set and optional -> return None
        return None
    else:
        #not set but not optional -> return default
        return 0.0

def _parseVectorProperty(
    p: proto.VectorProperty,
    pathDict: Dict[int, Path],
    optional: bool
) -> Optional[VectorProperty]:
    if p.HasField('pathId'):
        #fetch referenced path
        if p.pathId in pathDict:
            return pathDict[p.pathId]
        else:
            #referenced path does not exist -> return empty one
            return np.empty((0,4))
    elif p.HasField('constValue'):
        #construct vector
        return (p.constValue.x, p.constValue.y, p.constValue.z)
    elif optional:
        #not set and optional -> Return None
        return None
    else:
        #not set and not optional -> Return default
        return (0.0, 0.0, 0.0)

def _parseColorProperty(
    p: proto.ColorProperty,
    graphDict: Dict[int, Graph],
    optional: bool,
    default: Tuple[float, float, float] = (1.0,1.0,1.0)
) -> Optional[ColorProperty]:
    if p.HasField('graphId'):
        #fetch graph
        if p.graphId in graphDict:
            return graphDict[p.graphId]
        else:
            #referenced graph does not exist -> return empty one
            return np.empty((0,2))
    elif p.HasField('constValue'):
        #construct color
        return (p.constValue.r, p.constValue.g, p.constValue.b)
    elif p.HasField('scalarValue'):
        return p.scalarValue
    elif optional:
        #not set and optional -> Return None
        return None
    else:
        #return default
        return default

################################## Objects #####################################

def _parseSphere(
    sphere: proto.Sphere,
    graphDict: Dict[int, Graph],
    pathDict: Dict[int, Path]
) -> Sphere:
    result = Sphere()
    #meta
    name = sphere.name
    description = sphere.description
    visible = sphere.isVisible
    #properties
    position = _parseVectorProperty(sphere.position, pathDict, True)
    radius = _parseScalarProperty(sphere.radius, graphDict, False)
    assert(radius is not None)
    color = _parseColorProperty(sphere.color, graphDict, False)
    assert(color is not None)
    #done
    return Sphere(name,
        description=description,
        visible=visible,
        color=color,
        position=position,
        radius=radius)

def _parseTube(
    tube: proto.Tube,
    graphDict: Dict[int, Graph],
    pathDict: Dict[int, Path]
) -> Tube:
    #meta
    name = tube.name
    description = tube.description
    visible = tube.isVisible
    #properties
    path: PathLike = graphDict[tube.pathId] if tube.pathId in graphDict else np.empty((0,4)) #type: ignore[assignment]
    isGrowing = tube.isGrowing
    radius = _parseScalarProperty(tube.radius, graphDict, False)
    assert(radius is not None)
    color = _parseColorProperty(tube.color, graphDict, False)
    assert(color is not None)
    #done
    return Tube(path, name,
        description=description,
        visible=visible,
        isGrowing=isGrowing,
        radius=radius,
        color=color)

def _parseLine(
    line: proto.Line,
    graphDict: Dict[int, Graph],
    pathDict: Dict[int, Path]
) -> Line:
    #meta
    name = line.name
    description = line.description
    visible = line.isVisible
    #properties
    start = _parseVectorProperty(line.start, pathDict, True)
    end = _parseVectorProperty(line.end, pathDict, True)
    linewidth = _parseScalarProperty(line.headWidth, graphDict, False)
    assert(linewidth is not None)
    headSize = _parseScalarProperty(line.headSize, graphDict, True)
    color = _parseColorProperty(line.color, graphDict, False)
    assert(color is not None)
    #Done
    return Line(name,
        description=description,
        visible=visible,
        color=color,
        start=start,
        end=end,
        linewidth=linewidth,
        headSize=headSize)

def _parseLabel(
    label: proto.Label,
    graphDict: Dict[int, Graph],
    pathDict: Dict[int, Path]
) -> Label:
    #meta
    name = label.name
    description = label.description
    visible = label.isVisible
    #properties
    color = _parseColorProperty(label.color, graphDict, False)
    assert(color is not None)
    position = _parseVectorProperty(label.position, pathDict, True)
    fontSize = _parseScalarProperty(label.fontSize, graphDict, True)
    background = _parseColorProperty(label.background, graphDict, True)
    if background is None:
        background = (1.0,1.0,1.0,0.0) #transparent
    #done
    return Label(name,
        description=description,
        visible=visible,
        color=color,
        position=position,
        fontSize=fontSize,
        background=background)

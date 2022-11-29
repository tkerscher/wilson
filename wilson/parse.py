from typing import overload, Dict, Literal, Optional, Tuple
import numpy as np

from wilson.objects import Line, Sphere, Tube, Overlay
from wilson.data import (
    ColorMap,
    ColorProperty,
    Graph,
    Interpolation,
    ScalarProperty,
    Path,
    PathLike,
    VectorProperty,
)
from wilson.project import Camera, Project
import wilson.proto as proto


class ProjectParserException(Exception):
    """Exception class raised during project parsing errors."""

    def __init__(self, message: str) -> None:
        super().__init__(message)


def parseProjectFromBytes(data: bytes) -> Project:
    """
    Parses the project from the given bytes object and returns the loaded project
    """
    # ask protobuf to parse string
    project = proto.Project()
    project.ParseFromString(data)
    result = Project()

    # load meta (fills blank values with default values)
    result.name = project.meta.name
    result.author = project.meta.author
    result.date = project.meta.date.ToDatetime() if project.meta.HasField("date") else None
    result.description = project.meta.description

    # load time stuff
    result.startTime = project.meta.startTime
    result.endTime = project.meta.endTime
    result.speedRatio = project.meta.speedRatio

    # load data; keep ids for later referencing in the properties
    _graphs = dict(_parseGraph(g) for g in project.graphs)
    result.graphs = list(_graphs.values())
    _paths = dict(_parsePath(p) for p in project.paths)
    result.paths = list(_paths.values())

    # parse animatables
    result.animatables = []
    result.addAnimatables(_parseSphere(s, _graphs, _paths) for s in project.spheres)
    result.addAnimatables(_parseTube(t, _graphs, _paths) for t in project.tubes)
    result.addAnimatables(_parseLine(l, _graphs, _paths) for l in project.lines)
    result.addAnimatables(_parseOverlay(o, _graphs, _paths) for o in project.overlays)

    # hidden groups
    result.hiddenGroups = project.hiddenGroups  # type: ignore[assignment]

    # additional properties
    if project.HasField("camera"):
        result.camera = _parseCamera(project.camera, _paths)
    if project.HasField("colormap"):
        result.colormap = _parseColormap(project.colormap)

    # done
    return result


################################## Data ########################################


def _parseInterpolation(intpol: proto.Interpolation.ValueType) -> Interpolation:
    if intpol == proto.Interpolation.HOLD:
        return Interpolation.HOLD
    if intpol == proto.Interpolation.AHEAD:
        return Interpolation.AHEAD
    if intpol == proto.Interpolation.STEP:
        return Interpolation.STEP
    # return default if default or not known
    return Interpolation.LINEAR


def _parseGraph(graph: proto.Graph) -> Tuple[int, Graph]:
    # meta
    name = graph.name
    interpolation = _parseInterpolation(graph.interpolation)
    # data
    array = np.empty((len(graph.points), 2), dtype=np.float64)
    for i, point in enumerate(graph.points):
        array[i] = point.time, point.value
    # done -> return id value tuple to allow constructing a dict
    return (graph.id, Graph(array, name, interpolation))


def _parsePath(path: proto.Path) -> Tuple[int, Path]:
    # meta
    name = path.name
    interpolation = _parseInterpolation(path.interpolation)
    # data
    array = np.empty((len(path.points), 4))
    for i, point in enumerate(path.points):
        p = point.position
        array[i] = point.time, p.x, p.y, p.z
    # done -> return id value tuple to allow constructing a dict
    return (path.id, Path(array, name, interpolation))


def _parseColormap(colormap: proto.ColorMap) -> ColorMap:
    cmap = np.empty((len(colormap.stops), 5))
    for i, stop in enumerate(colormap.stops):
        cmap[i] = stop.value, stop.color.r, stop.color.g, stop.color.b, stop.color.a
    return cmap


def _parseCamera(camera: proto.Camera, pathDict: Dict[int, Path]) -> Camera:
    position = (camera.position.x, camera.position.y, camera.position.z)
    target = (camera.target.x, camera.target.y, camera.target.z)
    return Camera(position=position, target=target)


def _parseTextPosition(position: proto.TextPosition.ValueType) -> str:
    if position == proto.TextPosition.CENTER:
        return "center"
    elif position == proto.TextPosition.UPPER_RIGHT:
        return "upper right"
    elif position == proto.TextPosition.TOP:
        return "top"
    elif position == proto.TextPosition.UPPER_LEFT:
        return "upper left"
    elif position == proto.TextPosition.LEFT:
        return "left"
    elif position == proto.TextPosition.LOWER_LEFT:
        return "lower left"
    elif position == proto.TextPosition.BOTTOM:
        return "bottom"
    elif position == proto.TextPosition.LOWER_RIGHT:
        return "lower right"
    elif position == proto.TextPosition.RIGHT:
        return "right"
    else:
        # default
        return "lower left"


################################ Properties ####################################


@overload
def _parseScalarProperty(
    p: proto.ScalarProperty, graphDict: Dict[int, Graph], optional: Literal[True]
) -> ScalarProperty:
    ...


@overload
def _parseScalarProperty(
    p: proto.ScalarProperty, graphDict: Dict[int, Graph], optional: Literal[False]
) -> Optional[ScalarProperty]:
    ...


def _parseScalarProperty(
    p: proto.ScalarProperty, graphDict: Dict[int, Graph], optional: bool
) -> Optional[ScalarProperty]:
    if p.HasField("graphId"):
        # fetch referenced graph
        if p.graphId in graphDict:
            return graphDict[p.graphId]
        else:
            # referenced graph does not exist -> return empty one
            return np.empty((0, 2))
    elif p.HasField("constValue"):
        return p.constValue
    elif optional:
        # not set and optional -> return None
        return None
    else:
        # not set but not optional -> return default
        return 0.0


@overload
def _parseVectorProperty(
    p: proto.VectorProperty, pathDict: Dict[int, Path], optional: Literal[True]
) -> VectorProperty:
    ...


@overload
def _parseVectorProperty(
    p: proto.VectorProperty, pathDict: Dict[int, Path], optional: Literal[False]
) -> Optional[VectorProperty]:
    ...


def _parseVectorProperty(
    p: proto.VectorProperty, pathDict: Dict[int, Path], optional: bool
) -> Optional[VectorProperty]:
    if p.HasField("pathId"):
        # fetch referenced path
        if p.pathId in pathDict:
            return pathDict[p.pathId]
        else:
            # referenced path does not exist -> return empty one
            return np.empty((0, 4))
    elif p.HasField("constValue"):
        # construct vector
        return (p.constValue.x, p.constValue.y, p.constValue.z)
    elif optional:
        # not set and optional -> Return None
        return None
    else:
        # not set and not optional -> Return default
        return (0.0, 0.0, 0.0)


def _parseColorProperty(
    p: proto.ColorProperty,
    graphDict: Dict[int, Graph],
    optional: bool,
    default: Tuple[float, float, float] = (1.0, 1.0, 1.0),
) -> Optional[ColorProperty]:
    if p.HasField("graphId"):
        # fetch graph
        if p.graphId in graphDict:
            return graphDict[p.graphId]
        else:
            # referenced graph does not exist -> return empty one
            return np.empty((0, 2))
    elif p.HasField("constValue"):
        # construct color
        return (p.constValue.r, p.constValue.g, p.constValue.b)
    elif p.HasField("scalarValue"):
        return p.scalarValue
    elif optional:
        # not set and optional -> Return None
        return None
    else:
        # return default
        return default


################################## Objects #####################################


def _parseSphere(
    sphere: proto.Sphere, graphDict: Dict[int, Graph], pathDict: Dict[int, Path]
) -> Sphere:
    # meta
    name = sphere.name
    groups = sphere.groups
    description = sphere.description
    # properties
    position = _parseVectorProperty(sphere.position, pathDict, True)
    radius = _parseScalarProperty(sphere.radius, graphDict, False)
    assert radius is not None
    color = _parseColorProperty(sphere.color, graphDict, False)
    assert color is not None
    # done
    return Sphere(
        name, groups=groups, description=description, color=color, position=position, radius=radius
    )


def _parseTube(tube: proto.Tube, graphDict: Dict[int, Graph], pathDict: Dict[int, Path]) -> Tube:
    # meta
    name = tube.name
    groups = tube.groups
    description = tube.description
    # properties
    path: PathLike = graphDict[tube.pathId] if tube.pathId in graphDict else np.empty((0, 4))  # type: ignore[assignment]
    isGrowing = tube.isGrowing
    radius = _parseScalarProperty(tube.radius, graphDict, False)
    assert radius is not None
    color = _parseColorProperty(tube.color, graphDict, False)
    assert color is not None
    # done
    return Tube(
        path,
        name,
        groups=groups,
        description=description,
        isGrowing=isGrowing,
        radius=radius,
        color=color,
    )


def _parseLine(line: proto.Line, graphDict: Dict[int, Graph], pathDict: Dict[int, Path]) -> Line:
    # meta
    name = line.name
    groups = line.groups
    description = line.description
    color = _parseColorProperty(line.color, graphDict, False)
    assert color is not None
    # properties
    start = _parseVectorProperty(line.start, pathDict, True)
    end = _parseVectorProperty(line.end, pathDict, True)
    lineWidth = _parseScalarProperty(line.lineWidth, graphDict, False)
    assert lineWidth is not None
    pointForward = line.pointForward
    pointBackward = line.pointBackward
    # Done
    return Line(
        name,
        groups=groups,
        description=description,
        color=color,
        start=start,
        end=end,
        lineWidth=lineWidth,
        pointForward=pointForward,
        pointBackward=pointBackward,
    )


def _parseOverlay(
    overlay: proto.Overlay, graphDict: Dict[int, Graph], pathDict: Dict[int, Path]
) -> Overlay:
    # meta
    name = overlay.name
    groups = overlay.groups
    description = overlay.description
    # properties
    text = overlay.text  # TODO: fetch referenced graphs and paths
    position = _parseTextPosition(overlay.position)
    fontSize = _parseScalarProperty(overlay.fontSize, graphDict, True)
    bold = overlay.bold
    italic = overlay.italic
    # done
    return Overlay(
        text,
        name,
        groups=groups,
        description=description,
        position=position,
        fontSize=fontSize,
        bold=bold,
        italic=italic,
    )

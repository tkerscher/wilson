from __future__ import annotations
from datetime import datetime
from typing import Iterable, List, Optional

from p1on.objects import Animatable
from p1on.data import ColorLike, ColorMap, Graph, Path, VectorProperty

class Camera:
    """A virtual camera representing the view of the animation
    
    Attributes
    ----------
    position: {VectorProperty, None}, default=None
        The position the camera sits. Origin if None
    
    target: {VectorProperty, None}: default=None
        The location the camera points at.
    """
    def __init__(
        self,
        *,
        position: Optional[VectorProperty] = None,
        target: Optional[VectorProperty] = None
    ):
        self.position = position
        self.target = target
    
    @property
    def position(self) -> Optional[VectorProperty]:
        """Position the camera sits."""
        return self._position
    @position.setter
    def position(self, value: Optional[VectorProperty]) -> None:
        self._position = value

    @property
    def target(self) -> Optional[VectorProperty]:
        """Location the camera points at."""
        return self._target
    @target.setter
    def target(self, value: Optional[VectorProperty]) -> None:
        self._target = value

class Project:
    """Data model for a animation project with the ability to serialize and
    deserialize.
    
    Attributes
    ----------
    name: str, default=''
        Name of the project
    
    author: Optional[str], default=None
        Name of the author or detector of the event
    
    date: Optional[datetime], default=None
        Date of the experiment or event
    
    description: Optional[str], default=None
        Additional information about the event
    
    startTime: Optional[float], default=None
        Time value, from which the animation starts.
        If None, will be set to earliest graph or path point.
    
    endTime: Optional[float], default=None
        Time value, where the animation ends.
        If None, will be set to latest graph or path point.
    
    speedRatio: float, default=1.0
        Playback speed in time units per second
    
    graphs: Iterable[GraphLike]
        List of graph like data to be included into the project
    
    paths: Iterable[PathLike]
        List of path like data to be included into the project
    
    animatables: Iterable[Animatable]
        List of animatables to be included into the project
    
    clearColor: ColorLike, default='white'
        Background color of the whole animation scene
    
    camera: Optional[Camera], default=None
        An optional animatable camera

    colormap: Optional[Camera], default=None
        Color map used to translate scalars into colors. If None, viridis is used.
    """
    def __init__(
        self,
        name: str = '',
        *,
        author: Optional[str] = None,
        date: Optional[datetime] = None,
        description: Optional[str] = None,
        startTime: Optional[float] = None,
        endTime: Optional[float] = None,
        speedRatio: float = 1.0,
        graphs: Iterable[Graph] = [],
        paths: Iterable[Path] = [],
        animatables: Iterable[Animatable] = [],
        clearColor: ColorLike = 'white',
        camera: Optional[Camera] = None,
        colormap: Optional[ColorMap] = None
    ):
        self.name = name
        self.author = author
        self.date = date
        self.description = description
        self.startTime = startTime
        self.endTime = endTime
        self.speedRatio = speedRatio
        self.graphs = graphs # type: ignore[assignment]
        self.paths = paths # type: ignore[assignment]
        self.animatables = animatables # type: ignore[assignment]
        self.clearColor = clearColor
        self.camera = camera
        self.colormap = colormap
    
    @property
    def name(self) -> str:
        """Name of the project"""
        return self._name
    @name.setter
    def name(self, value: str) -> None:
        self._name = value
    
    @property
    def author(self) -> Optional[str]:
        """Name of the author or detector of the event"""
        return self._author
    @author.setter
    def author(self, value: Optional[str]) -> None:
        self._author = value
    @author.deleter
    def author(self) -> None:
        self._author = None
    
    @property
    def date(self) -> Optional[datetime]:
        """Date of the experiment or event"""
        return self._date
    @date.setter
    def date(self, value: Optional[datetime]) -> None:
        self._date = value
    @date.deleter
    def date(self) -> None:
        self._date = None
    
    @property
    def description(self) -> Optional[str]:
        """Additional information about the event"""
        return self._description
    @description.setter
    def description(self, value: Optional[str]) -> None:
        self._description = value
    @description.deleter
    def description(self) -> None:
        self._description = None
    
    @property
    def startTime(self) -> Optional[float]:
        """Time value, from which the animation starts"""
        return self._startTime
    @startTime.setter
    def startTime(self, value: Optional[float]) -> None:
        self._startTime = value
    @startTime.deleter
    def startTime(self) -> None:
        self._startTime = None
    
    @property
    def endTime(self) -> Optional[float]:
        """Time value, where the animation ends"""
        return self._endTime
    @endTime.setter
    def endTime(self, value: Optional[float]) -> None:
        self._endTime = value
    @endTime.deleter
    def endTime(self) -> None:
        self._endTime = None
    
    @property
    def speedRatio(self) -> float:
        """Playback speed in time units per second"""
        return self._speedRatio
    @speedRatio.setter
    def speedRatio(self, value: float) -> None:
        self._speedRatio = value
    
    @property
    def graphs(self) -> List[Graph]:
        return self._graphs
    @graphs.setter
    def graphs(self, value: Iterable[Graph]) -> None:
        self._graphs = list(value)
    @graphs.deleter
    def graphs(self) -> None:
        self._graphs = []
    def appendGraph(self, graph: Graph) -> None:
        """Appends a single graph to the internal list"""
        self.graphs.append(graph)
    def addGraphs(self, graphs: Iterable[Graph]) -> None:
        """Adds multiple graphs"""
        self.graphs.extend(graphs)
    def clearGraphs(self) -> None:
        """Removes all graphs from this project"""
        self._graphs = []
    
    @property
    def paths(self) -> List[Path]:
        return self._paths
    @paths.setter
    def paths(self, value: Iterable[Path]) -> None:
        self._paths = list(value)
    @paths.deleter
    def paths(self) -> None:
        self._paths = []
    def appendPath(self, path: Path) -> None:
        """Appends a single path to the internal list"""
        self.paths.append(path)
    def addPaths(self, paths: Iterable[Path]) -> None:
        """Adds multiple paths"""
        self.paths.extend(paths)
    def clearPaths(self) -> None:
        """Removes all paths from this project"""
        self._paths = []
    
    @property
    def animatables(self) -> List[Animatable]:
        return self._animatables
    @animatables.setter
    def animatables(self, value: Iterable[Animatable]) -> None:
        self._animatables = list(value)
    @animatables.deleter
    def animatables(self) -> None:
        self._animatables = []
    def appendAnimatable(self, animatable: Animatable) -> None:
        """Appends a single animatable to the internal list"""
        self.animatables.append(animatable)
    def addAnimatables(self, animatables: Iterable[Animatable]) -> None:
        """Adds multiple animatables"""
        self.animatables.extend(animatables)
    def clearAnimatables(self) -> None:
        """Removes all animatables from this project"""
        self._animatables = []
    
    @property
    def clearColor(self) -> ColorLike:
        """Background color of the whole animation scene"""
        return self._clear
    @clearColor.setter
    def clearColor(self, value: ColorLike) -> None:
        self._clear = value
    
    @property
    def camera(self) -> Optional[Camera]:
        """An optional animatable camera"""
        return self._camera
    @camera.setter
    def camera(self, value: Optional[Camera]) -> None:
        self._camera = value
    @camera.deleter
    def camera(self) -> None:
        self._camera = None

    @property
    def colormap(self) -> Optional[ColorMap]:
        """Color map used to translate scalars into colors."""
        return self._colormap
    @colormap.setter
    def colormap(self, value: Optional[ColorMap]) -> None:
        self._colormap = value
    @colormap.deleter
    def colormap(self) -> None:
        self._colormap = None

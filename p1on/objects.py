from abc import ABC
from typing import List, Iterable, Optional
from p1on.data import GraphLike, PathLike, TextLike, ScalarProperty, VectorProperty, ColorProperty

class Animatable(ABC):
    """Base class of all animatable objects
    
    Attributes
    ----------
    name: {str, None}, default=None
        Name of this object

    group: {str, None}, default=None
        Name of group the animatable belongs to.
    
    description: {TextLike, None}, default=None
        Additional description shown while this object is highlighted
    """
    def __init__(
        self,
        name: Optional[str] = None,
        *,               
        group: Optional[str] = None,
        description: Optional[TextLike] = None
    ):
        self._name = name
        self._group = group
        self._description = description
    
    @property
    def name(self) -> Optional[str]:
        """The name of the object as shown in the explorer."""
        return self._name
    @name.setter
    def name(self, value: Optional[str]) -> None:
        self._name = value
    @name.deleter
    def name(self) -> None:
        self._name = None

    @property
    def group(self) -> Optional[str]:
        """Name of group the animatable belongs to."""
        return self._group
    @group.setter
    def group(self, value: Optional[str]) -> None:
        self._group = value
    @group.deleter
    def group(self) -> None:
        self._group = None
    
    @property
    def description(self) -> Optional[TextLike]:
        """The description of the object shown while highlighted."""
        return self._description
    @description.setter
    def description(self, value: Optional[TextLike]) -> None:
        self._description = value
    @description.deleter
    def description(self) -> None:
        self._description = None 

class Sphere(Animatable):
    """Simple sphere in 3D space
    
    Attributes
    ----------
    name: {str, None}, default=None
        Name of this object
    
    group: {str, None}, default=None
        Name of group the sphere belongs to.

    description: {TextLike, None}, default=None
        Additional description shown while this object is highlighted
    
    position: {VectorProperty, None}, default=None
        Center of the sphere given in x,y,z coordinates. Defaults to the origin
        if not given, i.e. None.
    
    radius: ScalarProperty, default=1.0
        Radius of the sphere
    
    color: ColorProperty, default='black'
        Color of the surface
    """
    def __init__(
        self,
        name: Optional[str] = None,
        *,
        group: Optional[str] = None,
        description: Optional[TextLike] = None,
        position: Optional[VectorProperty] = None,
        radius: ScalarProperty = 1.0,
        color: ColorProperty = 'black'
    ):
        super().__init__(
            name=name,
            group=group,
            description=description)
        self.position = position
        self.radius = radius
        self.color = color
    
    @property
    def position(self) -> Optional[VectorProperty]:
        """The center of the sphere."""
        return self._position
    @position.setter
    def position(self, value: Optional[VectorProperty]) -> None:
        self._position = value
    @position.deleter
    def position(self) -> None:
        self._position = None
    
    @property
    def radius(self) -> ScalarProperty:
        """Radius of the sphere"""
        return self._radius
    @radius.setter
    def radius(self, value: ScalarProperty) -> None:
        self._radius = value  

    @property
    def color(self) -> ColorProperty:
        """Color of the sphere"""
        return self._color
    @color.setter
    def color(self, value: ColorProperty) -> None:
        self._color = value
    @color.deleter
    def color(self) -> None:
        self._color = 'black' 

class Tube(Animatable):
    """Simple sphere in 3D space
    
    Attributes
    ----------
    path: PathLike
        The path the tube will follow. Shape of (4,N) with the columns time, x,
        y, z. See VectorProperty for details.

    name: {str, None}, default=None
        Name of this object

    group: {str, None}, default=None
        Name of group the tube belongs to.
    
    description: {TextLike, None}, default=None
        Additional description shown while this object is highlighted
    
    isGrowing: {bool}, default=True
        Wether the tube should grow in time as determined by the path it's
        following.
    
    radius: ScalarProperty, default=1.0
        Radius of the tube. If given by a graph, the radius is determined by
        matching the time values of the path with the radius. I.e. path and
        radius are functions of time evaluated for the same time.
    
    color: ColorProperty, default='black'
        Color of the surface 
    """
    def __init__(
        self,
        path: PathLike,
        name: Optional[str] = None,
        *,
        group: Optional[str] = None,
        description: Optional[TextLike] = None,
        isGrowing: bool = True,
        radius: ScalarProperty = 1.0,
        color: ColorProperty = 'black'
    ):
        super().__init__(
            name=name,
            group=group,
            description=description)
        self.path = path
        self.isGrowing = isGrowing
        self.radius = radius
        self.color = color
    
    @property
    def path(self) -> PathLike:
        """Path the tube follows"""
        return self._path
    @path.setter
    def path(self, value: PathLike) -> None:
        self._path = value
    
    @property
    def radius(self) -> ScalarProperty:
        """Radius of the tube. See tube's description."""
        return self._radius
    @radius.setter
    def radius(self, value: ScalarProperty) -> None:
        self._radius = value
    
    @property
    def isGrowing(self) -> bool:
        """
        Wether the tube should grow in time as determined by the path it's
        following.
        """
        return self._isGrowing
    @isGrowing.setter
    def isGrowing(self, value: bool) -> None:
        self._isGrowing = value

    @property
    def color(self) -> ColorProperty:
        """Color of the surface"""
        return self._color
    @color.setter
    def color(self, value: ColorProperty) -> None:
        self._color = value
    @color.deleter
    def color(self) -> None:
        self._color = 'black' 

class Line(Animatable):
    """Animated line in 3D space
    
    Attributes
    ----------
    name: {str, None}, default=None
        Name of this object
    
    group: {str, None}, default=None
        Name of group the line belongs to.

    description: {TextLike, None}, default=None
        Additional description shown while this object is highlighted

    color: ColorProperty, default='black'
        Color of the surface
    
    start: {VectorProperty, None}, default=None,
        Start position of the line. Origin if None.
    
    end: {VectorProperty, None}, default=None,
        End position of the line. Origin if None.
    
    lineWidth: ScalarProperty, default=1.0
        Diameter of the line.

    pointForward: bool, default=False
        True, if the line should be a arrow pointing from end to start
    
    pointBackward: bool, default=False
        True, if the line should be a arrow pointing from start to end
    """
    def __init__(
        self,
        name: Optional[str] = None,
        *,
        group: Optional[str] = None,
        description: Optional[TextLike] = None,
        color: ColorProperty = 'black',
        start: Optional[VectorProperty] = None,
        end: Optional[VectorProperty] = None,
        lineWidth: ScalarProperty = 1.0,
        pointForward: bool = False,
        pointBackward: bool = False
    ):
        super().__init__(
            name=name,
            group=group,
            description=description)
        self.start = start
        self.end = end
        self.lineWidth = lineWidth
        self.pointForward = pointForward
        self.pointBackward = pointBackward
        self.color = color
    
    @property
    def start(self) -> Optional[VectorProperty]:
        """Start position of the line. Origin if None."""
        return self._start
    @start.setter
    def start(self, value: Optional[VectorProperty]) -> None:
        self._start = value
    @start.deleter
    def start(self) -> None:
        self._start = None
    
    @property
    def end(self) -> Optional[VectorProperty]:
        """End position of the line. Origin if None."""
        return self._end
    @end.setter
    def end(self, value: Optional[VectorProperty]) -> None:
        self._end = value
    @end.deleter
    def end(self) -> None:
        self._end = None
    
    @property
    def lineWidth(self) -> ScalarProperty:
        """Diameter of the line."""
        return self._lineWidth
    @lineWidth.setter
    def lineWidth(self, value: ScalarProperty) -> None:
        self._lineWidth = value

    @property
    def pointForward(self) -> bool:
        """True, if arrow from end to start"""
        return self._pointForward
    @pointForward.setter
    def pointForward(self, value: bool) -> None:
        self._pointForward = value
    
    @property
    def pointBackward(self) -> bool:
        """True, if arrow from start to end"""
        return self._pointBackward
    @pointBackward.setter
    def pointBackward(self, value: bool) -> None:
        self._pointBackward = value

    @property
    def color(self) -> ColorProperty:
        """Color of the surface"""
        return self._color
    @color.setter
    def color(self, value: ColorProperty) -> None:
        self._color = value
    @color.deleter
    def color(self) -> None:
        self._color = 'black' 

class Overlay(Animatable):
    """Animated overlay text on the screen surface
    
    Attributes
    ----------
    text: {TextLike}, default=""
        Text to be displayed

    name: {str, None}, default=None
        Name of this object
    
    group: {str, None}, default=None
        Name of group the line belongs to.

    description: {TextLike, None}, default=None
        Additional description shown while this object is highlighted
    
    position: str, default='lower left'
        Position of the text
    
    fontSize: ScalarProperty, default=16
        Font size of the text
    
    bold: bool, default=False
        Whether to draw the text bold

    italic: bool, default=False
        Whether to draw the text in italic
    """
    def __init__(self,
        text: TextLike = "",
        name: Optional[str] = None,
        *,
        group: Optional[str] = None,
        description: Optional[TextLike] = None,
        position: str = 'lower left',
        fontSize: ScalarProperty = 16,
        bold: bool = False,
        italic: bool = False,
        graphs: Iterable[GraphLike] = [],
        paths: Iterable[PathLike] = []
    ):
        super().__init__(
            name=name,
            group=group,
            description=description)
        self.text = text
        self.position = position
        self.fontSize = fontSize
        self.bold = bold
        self.italic = italic
        self.graphs = graphs
        self.paths = paths
    
    #All allowed values for position
    _positions = (
        'center', 'c',
        'top', 't',
        'bottom', 'b',
        'left', 'l',
        'right', 'r',
        'upper right', 'ur',
        'upper left', 'ul',
        'lower left', 'll',
        'lower right', 'lr')

    @property
    def text(self) -> TextLike:
        """Text to be displayed on the screen"""
        return self._content
    @text.setter
    def text(self, value: TextLike) -> None:
        self._content = value

    @property
    def position(self) -> str:
        """Position of the text"""
        return self._position
    @position.setter
    def position(self, value: str) -> None:
        if not value in Overlay._positions:
            raise ValueError('The value is not a valid position!')
        self._position = value
    
    @property
    def fontSize(self) -> ScalarProperty:
        """Font size of the text"""
        return self._fontSize
    @fontSize.setter
    def fontSize(self, value: ScalarProperty) -> None:
        self._fontSize = value

    @property
    def bold(self) -> bool:
        """`True` if the text should be drawn bold"""
        return self._bold
    @bold.setter
    def bold(self, value: bool) -> None:
        self._bold = value

    @property
    def italic(self) -> bold:
        """`True` if the text should be drawn in italic"""
        return self._italic
    @italic.setter
    def italic(self, value: bool) -> None:
        self._italic = value

from abc import ABC
from typing import Optional
from p1on.data import PathLike, ScalarProperty, VectorProperty, ColorProperty

class Animatable(ABC):
    """Base class of all animatable objects
    
    Attributes
    ----------
    name: {str, None}, default=None
        Name of this object
    
    description: {str, None}, default=None
        Additional description shown while this object is highlighted
    
    visible: {bool}, default=True
        Wether to show this object in the animation

    color: ColorProperty, default='black'
        Color of the surface
    """
    def __init__(
        self,
        name: Optional[str] = None,
        *,               
        description: Optional[str] = None,
        visible: bool = True,
        color: ColorProperty = 'black'
    ):
        self._name = name
        self._description = description
        self._visible = visible
        self._color = color
    
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
    def description(self) -> Optional[str]:
        """The description of the object shown while highlighted."""
        return self._description
    @description.setter
    def description(self, value: Optional[str]) -> None:
        self._description = value
    @description.deleter
    def description(self) -> None:
        self._description = None
    
    @property
    def visible(self) -> bool:
        """Wether to show this object in the animation."""
        return self._visible
    @visible.setter
    def visible(self, value: bool) -> None:
        self._visible = value

    @property
    def color(self) -> ColorProperty:
        """Color of the sphere"""
        return self._color
    @color.setter
    def color(self, value: ColorProperty) -> None:
        self._color = value
    @color.deleter
    def color(self) -> None:
        self._color = 'transparent'  

class Sphere(Animatable):
    """Simple sphere in 3D space
    
    Attributes
    ----------
    name: {str, None}, default=None
        Name of this object
    
    description: {str, None}, default=None
        Additional description shown while this object is highlighted
    
    visible: {bool}, default=True
        Wether to show this object in the animation
    
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
        description: Optional[str] = None,
        visible: bool = True,
        position: Optional[VectorProperty] = None,
        radius: ScalarProperty = 1.0,
        color: ColorProperty = 'black'
    ):
        super().__init__(
            name=name,
            description=description,
            visible=visible,
            color=color)
        self._position = position
        self._radius = radius
    
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

class Tube(Animatable):
    """Simple sphere in 3D space
    
    Attributes
    ----------
    path: PathLike
        The path the tube will follow. Shape of (4,N) with the columns time, x,
        y, z. See VectorProperty for details.

    name: {str, None}, default=None
        Name of this object
    
    description: {str, None}, default=None
        Additional description shown while this object is highlighted
    
    visible: {bool}, default=True
        Wether to show this object in the animation
    
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
        description: Optional[str] = None,
        visible: bool = True,
        isGrowing: bool = False,
        radius: ScalarProperty = 1.0,
        color: ColorProperty = 'black'
    ):
        super().__init__(
            name=name,
            description=description,
            visible=visible,
            color=color)
        self.path = path
        self.isGrowing = isGrowing
        self.radius = radius
    
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

class Line(Animatable):
    """Animated line in 3D space
    
    Attributes
    ----------
    name: {str, None}, default=None
        Name of this object
    
    description: {str, None}, default=None
        Additional description shown while this object is highlighted
    
    visible: {bool}, default=True
        Wether to show this object in the animation

    color: ColorProperty, default='black'
        Color of the surface
    
    start: {VectorProperty, None}, default=None,
        Start position of the line. Origin if None.
    
    end: {VectorProperty, None}, default=None,
        End position of the line. Origin if None.
    
    linewidth: ScalarProperty, default=1.0
        Diameter of the line.
    
    headSize: {ScalarProperty, None}, default=None
        Cone diameter of arrow head. None or zero if no arrow should be drawn.
    """
    def __init__(
        self,
        name: Optional[str] = None,
        *,               
        description: Optional[str] = None,
        visible: bool = True,
        color: ColorProperty = 'black',
        start: Optional[VectorProperty] = None,
        end: Optional[VectorProperty] = None,
        linewidth: ScalarProperty = 1.0,
        headSize: Optional[ScalarProperty] = None
    ):
        super().__init__(
            name=name,
            description=description,
            visible=visible,
            color=color)
        self._start = start
        self._end = end
        self._linewidth = linewidth
        self._headSize = headSize
    
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
    def linewidth(self) -> ScalarProperty:
        """Diameter of the line."""
        return self._linewidth
    @linewidth.setter
    def linewidth(self, value: ScalarProperty) -> None:
        self._linewidth = value
    
    @property
    def headSize(self) -> Optional[ScalarProperty]:
        """Cone diameter of arrow head. None or zero if no arrow should be drawn."""
        return self._headSize
    @headSize.setter
    def headSize(self, value: Optional[ScalarProperty]) -> None:
        self._headSize = value
    @headSize.deleter
    def headSize(self) -> None:
        self._headSize = None

class Label(Animatable):
    """Base class of all animatable objects
    
    Attributes
    ----------
    name: {str, None}, default=None
        Name of this object
    
    description: {str, None}, default=None
        Additional description shown while this object is highlighted
    
    visible: {bool}, default=True
        Wether to show this object in the animation

    color: ColorProperty, default='black'
        Color of the surface
    
    position: {VectorProperty, None}, default=None
        Upper left corner of the label. Origin if None
    
    fontsize: {ScalarProperty, None}, default=None
        Font size of label
    
    background: ColorProperty, default='transparent'
        Background of label
    """
    def __init__(
        self,
        name: Optional[str] = None,
        *,               
        description: Optional[str] = None,
        visible: bool = True,
        color: ColorProperty = 'black',
        position: Optional[VectorProperty] = None,
        fontSize: Optional[ScalarProperty] = None,
        background: ColorProperty = 'transparent'
    ):
        super().__init__(
            name=name,
            description=description,
            visible=visible,
            color=color)
        self._position = position
        self._fontSize = fontSize
        self._background = background
    
    @property
    def position(self) -> Optional[VectorProperty]:
        """Upper left corner of the label. Origin if None"""
        return self._position
    @position.setter
    def position(self, value: Optional[VectorProperty]) -> None:
        self._position = value
    @position.deleter
    def position(self) -> None:
        self._position = None
    
    @property
    def fontSize(self) -> Optional[ScalarProperty]:
        """Font size of label"""
        return self._fontSize
    @fontSize.setter
    def fontSize(self, value: Optional[ScalarProperty]) -> None:
        self._fontSize = value
    @fontSize.deleter
    def fontSize(self) -> None:
        self._fontSize = None
    
    @property
    def background(self) -> ColorProperty:
        """Background of label"""
        return self._background
    @background.setter
    def background(self, value: ColorProperty) -> None:
        self._background = value

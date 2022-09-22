from __future__ import annotations
import numpy as np
from enum import Enum
from numpy.typing import ArrayLike
from typing import Tuple, Union

class Interpolation(Enum):
    """Data Interpolation modes"""

    LINEAR = 0,
    """Linear interpolate between consecutive data points"""
    HOLD = 1,
    """Hold the last value until next data point is reached"""
    AHEAD = 2,
    """Hold the next value until next data point is reached"""
    STEP = 3,
    """Hold last value until exactly in between two consecutive data points
    when it will hold the next value"""

class Graph:
    """2D function mapping time to a scalar value by interpolating between
    control points. Columns of the underlying array are: time, value.
    
    Attributes
    ----------
    array: ArrayLike of shape(N, 2)
        Array of the control points
    
    name: str, default=''
        Name of the graph
    
    interpolation: Interpolation, default=LINEAR
        Interpolation mode to use to get values in between data points
    """
    def __init__(
        self,
        array: ArrayLike,
        name:str = '',
        interpolation: Interpolation = Interpolation.LINEAR
    ):
        self.array = array
        self.name = name
        self.interpolation = interpolation
    
    @property
    def array(self) -> ArrayLike:
        """The array holding the control points."""
        return self._array
    @array.setter
    def array(self, value: ArrayLike) -> None:
        shape = np.shape(value)
        if (len(shape) != 2 or shape[1] != 2):
            raise ValueError("The array must be of shape (N,2)!")
        self._array = value
    
    @property
    def name(self) -> str:
        """The name of the graph."""
        return self._name
    @name.setter
    def name(self, value: str) -> None:
        self._name = str(value)

    @property
    def interpolation(self) -> Interpolation:
        """Interpolation mode to use to get values in between data points"""
        return self._interpolation
    @interpolation.setter
    def interpolation(self, value: Interpolation) -> None:
        self._interpolation = value

    def __eq__(self, other: object) -> bool:
        return isinstance(other, Graph) \
            and other.name == self.name \
            and bool(np.equal(other.array, self.array).all())

class Path:
    """3D function mapping time to a vector value by interpolating between
    control points. Columns of the underlying array are: time, x, y, z.
    
    Attributes
    ----------
    array: ArrayLike of shape(N, 4)
        Array of the control points
    
    name: str, default=''
        Name of the graph

    interpolation: Interpolation, default=LINEAR
        Interpolation mode to use to get values in between data points
    """
    def __init__(
        self,
        array: ArrayLike,
        name:str = '',
        interpolation: Interpolation = Interpolation.LINEAR
    ):
        self.array = array
        self.name = name
        self.interpolation = interpolation
    
    @property
    def array(self) -> ArrayLike:
        """The array holding the control points."""
        return self._array
    @array.setter
    def array(self, value: ArrayLike) -> None:
        shape = np.shape(value)
        if (len(shape) != 2 or shape[1] != 4):
            raise ValueError("The array must be of shape (N,4)!")
        self._array = value
    
    @property
    def name(self) -> str:
        """The name of the graph."""
        return self._name
    @name.setter
    def name(self, value: str) -> None:
        self._name = str(value)
    
    @property
    def interpolation(self) -> Interpolation:
        """Interpolation mode to use to get values in between data points"""
        return self._interpolation
    @interpolation.setter
    def interpolation(self, value: Interpolation) -> None:
        self._interpolation = value
    
    def __eq__(self, other: object) -> bool:
        return isinstance(other, Path) \
            and other.name == self.name \
            and bool(np.equal(other.array, self.array).all())

ColorMap = Union[ArrayLike, str]
"""
A color map used to translate scalar values into colors by interpolating between
discrete color stops. It is basically a table whose rows contains stops
consisting of a scalar value followed by a color either as a rgb 3 tuple or rgba
4 tuple, i.e. an array of either shape (N,4) or (N,5).

Alternatively, one can specify the name of a colormap provided by matplotlib.
"""

GraphLike = Union[ArrayLike, Graph]
"""
Data types that can be used like a graph.
"""

PathLike = Union[ArrayLike, Path]
"""
Data types that can be used like a path.
"""

ColorLike = Union[Tuple[float, float, float], Tuple[float, float, float, float], str]
"""
Color either specified as 3 tuple rgb or named color (see xkcd color)
"""

ScalarProperty = Union[GraphLike, float]
"""
Scalar properties can either be assigned a constant float value or a array like
of shape (N,2) - columns are time,value - representing the control points of a
interpolated graph. The interpolation of these control points defaults to
'linear' but can be assigned as the second element in a tuple with the array.
"""

VectorProperty = Union[PathLike, Tuple[float, float, float]]
"""
Vector property can either be assigned a constant 3 component tuple, or a array
like of the shape (N,4) - columns are time, x, y, z - representing the control
points of a interpolated curve. The interpolation of these control points
defaults to 'linear' but can be assigned as the second element in a tuple with
the array.
"""

ColorProperty = Union[ScalarProperty, ColorLike]
"""
Color property can either be assigned a constant color either as a named color
string (see xkcd colors), a normed rgb(a) tuple, a scalar value, or a array like
of the shape (N,2) similar to scalar property. The constant scalar or the
interpolated value from the GraphLike is converted into a color using the color
map.
"""

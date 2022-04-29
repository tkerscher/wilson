from __future__ import annotations
import numpy as np
from numpy.typing import ArrayLike
from typing import Literal, Tuple, Union

Interpolation = Literal['step', 'linear', 'cubic']
"""
Interpolation method between control points.
"""

class Graph:
    """2D function mapping time to a scalar value by interpolating between
    control points. Columns of the underlying array are: time, value.
    
    Attributes
    ----------
    array: ArrayLike of shape(N, 2)
        Array of the control points
    
    name: str, default=''
        Name of the graph
    
    interpolation: {'step', 'linear', 'cubic'}, default='linear'
        Interpolation mode
    """
    def __init__(
        self,
        array: ArrayLike,
        name:str = '',
        interpolation:Interpolation = 'linear'
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
        """The interpolation mode between control points."""
        return self._interpolation
    @interpolation.setter
    def interpolation(self, value: Interpolation) -> None:
        if (value not in {'step', 'linear', 'cubic'}):
            raise ValueError('Unknown interpolation mode: ' + str(value))
        self._interpolation = value

    def __eq__(self, other: object) -> bool:
        return isinstance(other, Graph) \
            and other.name == self.name \
            and other.interpolation == self.interpolation \
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
    
    interpolation: {'step', 'linear', 'cubic'}, default='linear'
        Interpolation mode
    """
    def __init__(
        self,
        array: ArrayLike,
        name:str = '',
        interpolation:Interpolation = 'linear'
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
        """The interpolation mode between control points."""
        return self._interpolation
    @interpolation.setter
    def interpolation(self, value: Interpolation) -> None:
        if (value not in {'step', 'linear', 'cubic'}):
            raise ValueError('Unknown interpolation mode: ' + str(value))
        self._interpolation = value
    
    def __eq__(self, other: object) -> bool:
        return isinstance(other, Path) \
            and other.name == self.name \
            and other.interpolation == self.interpolation \
            and bool(np.equal(other.array, self.array).all())

GraphLike = Union[ArrayLike, Graph]
"""
Data types that can be used like a graph.
"""

PathLike = Union[ArrayLike, Path]
"""
Data types that can be used like a path.
"""

ColorLike = Union[Tuple[float, float, float], str]
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

ColorProperty = Union[GraphLike, ColorLike]
"""
Color property can either be assigned a constant color either as a named color
string (see xkcd colors), a normed rgb tuple, or a array like of the shape (N,2)
similar to scalar property. The interpolated value is converted into a color
using a color map.
"""

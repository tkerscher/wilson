"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import google.protobuf.descriptor
import google.protobuf.internal.enum_type_wrapper
import sys
import typing

if sys.version_info >= (3, 10):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

class _Interpolation:
    ValueType = typing.NewType("ValueType", builtins.int)
    V: typing_extensions.TypeAlias = ValueType

class _InterpolationEnumTypeWrapper(google.protobuf.internal.enum_type_wrapper._EnumTypeWrapper[_Interpolation.ValueType], builtins.type):
    DESCRIPTOR: google.protobuf.descriptor.EnumDescriptor
    LINEAR: _Interpolation.ValueType  # 0
    """Linear interpolate between consecutive data points"""
    HOLD: _Interpolation.ValueType  # 1
    """Hold the last value until next data point is reached"""
    AHEAD: _Interpolation.ValueType  # 2
    """Hold the next value until next data point is reached"""
    STEP: _Interpolation.ValueType  # 3
    """Hold last value until exactly in between two consecutive data points
    when it will hold the next value
    """

class Interpolation(_Interpolation, metaclass=_InterpolationEnumTypeWrapper):
    """Interpolation modes"""

LINEAR: Interpolation.ValueType  # 0
"""Linear interpolate between consecutive data points"""
HOLD: Interpolation.ValueType  # 1
"""Hold the last value until next data point is reached"""
AHEAD: Interpolation.ValueType  # 2
"""Hold the next value until next data point is reached"""
STEP: Interpolation.ValueType  # 3
"""Hold last value until exactly in between two consecutive data points
when it will hold the next value
"""
global___Interpolation = Interpolation

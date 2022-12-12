"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import collections.abc
import google.protobuf.descriptor
import google.protobuf.internal.containers
import google.protobuf.message
import sys
from wilson.proto import interpolation_pb2

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

@typing_extensions.final
class Graph(google.protobuf.message.Message):
    """2D function mapping time to a scalar value"""

    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    @typing_extensions.final
    class Point(google.protobuf.message.Message):
        """Interpolation point"""

        DESCRIPTOR: google.protobuf.descriptor.Descriptor

        TIME_FIELD_NUMBER: builtins.int
        VALUE_FIELD_NUMBER: builtins.int
        time: builtins.float
        """Time coordinate"""
        value: builtins.float
        """Value at time"""
        def __init__(
            self,
            *,
            time: builtins.float = ...,
            value: builtins.float = ...,
        ) -> None: ...
        def ClearField(self, field_name: typing_extensions.Literal["time", b"time", "value", b"value"]) -> None: ...

    NAME_FIELD_NUMBER: builtins.int
    ID_FIELD_NUMBER: builtins.int
    POINTS_FIELD_NUMBER: builtins.int
    INTERPOLATION_FIELD_NUMBER: builtins.int
    name: builtins.str
    """Name as shown in explorer"""
    id: builtins.int
    """Unique id used to reference this graph"""
    @property
    def points(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[global___Graph.Point]:
        """interpolation points"""
    interpolation: interpolation_pb2.Interpolation.ValueType
    """interpolation mode"""
    def __init__(
        self,
        *,
        name: builtins.str = ...,
        id: builtins.int = ...,
        points: collections.abc.Iterable[global___Graph.Point] | None = ...,
        interpolation: interpolation_pb2.Interpolation.ValueType = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["id", b"id", "interpolation", b"interpolation", "name", b"name", "points", b"points"]) -> None: ...

global___Graph = Graph
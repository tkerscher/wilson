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
from wilson.proto import color_pb2

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

@typing_extensions.final
class ColorMap(google.protobuf.message.Message):
    """Color map converting scalars into colors"""

    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    @typing_extensions.final
    class Stop(google.protobuf.message.Message):
        """Color stops"""

        DESCRIPTOR: google.protobuf.descriptor.Descriptor

        VALUE_FIELD_NUMBER: builtins.int
        COLOR_FIELD_NUMBER: builtins.int
        value: builtins.float
        """value at which to stop"""
        @property
        def color(self) -> color_pb2.Color:
            """Color at this stop"""
        def __init__(
            self,
            *,
            value: builtins.float = ...,
            color: color_pb2.Color | None = ...,
        ) -> None: ...
        def HasField(self, field_name: typing_extensions.Literal["color", b"color"]) -> builtins.bool: ...
        def ClearField(self, field_name: typing_extensions.Literal["color", b"color", "value", b"value"]) -> None: ...

    STOPS_FIELD_NUMBER: builtins.int
    @property
    def stops(self) -> google.protobuf.internal.containers.RepeatedCompositeFieldContainer[global___ColorMap.Stop]:
        """gradient stops"""
    def __init__(
        self,
        *,
        stops: collections.abc.Iterable[global___ColorMap.Stop] | None = ...,
    ) -> None: ...
    def ClearField(self, field_name: typing_extensions.Literal["stops", b"stops"]) -> None: ...

global___ColorMap = ColorMap

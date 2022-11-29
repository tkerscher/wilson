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
from wilson.proto import properties_pb2

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

@typing_extensions.final
class Line(google.protobuf.message.Message):
    """Animated line in 3D space"""

    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    NAME_FIELD_NUMBER: builtins.int
    GROUPS_FIELD_NUMBER: builtins.int
    DESCRIPTION_FIELD_NUMBER: builtins.int
    COLOR_FIELD_NUMBER: builtins.int
    START_FIELD_NUMBER: builtins.int
    END_FIELD_NUMBER: builtins.int
    LINEWIDTH_FIELD_NUMBER: builtins.int
    POINTFORWARD_FIELD_NUMBER: builtins.int
    POINTBACKWARD_FIELD_NUMBER: builtins.int
    name: builtins.str
    """Name as shown in explorer"""
    @property
    def groups(self) -> google.protobuf.internal.containers.RepeatedScalarFieldContainer[builtins.str]:
        """Name of groups this belongs to"""
    description: builtins.str
    """Additional text shown when selected"""
    @property
    def color(self) -> properties_pb2.ColorProperty:
        """Color"""
    @property
    def start(self) -> properties_pb2.VectorProperty:
        """start position"""
    @property
    def end(self) -> properties_pb2.VectorProperty:
        """end position"""
    @property
    def lineWidth(self) -> properties_pb2.ScalarProperty:
        """Line diameter"""
    pointForward: builtins.bool
    """true, if there should be a cone pointing toward the start point"""
    pointBackward: builtins.bool
    """true, if there should be a cone pointing toward the end point"""
    def __init__(
        self,
        *,
        name: builtins.str = ...,
        groups: collections.abc.Iterable[builtins.str] | None = ...,
        description: builtins.str = ...,
        color: properties_pb2.ColorProperty | None = ...,
        start: properties_pb2.VectorProperty | None = ...,
        end: properties_pb2.VectorProperty | None = ...,
        lineWidth: properties_pb2.ScalarProperty | None = ...,
        pointForward: builtins.bool = ...,
        pointBackward: builtins.bool = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["color", b"color", "end", b"end", "lineWidth", b"lineWidth", "start", b"start"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["color", b"color", "description", b"description", "end", b"end", "groups", b"groups", "lineWidth", b"lineWidth", "name", b"name", "pointBackward", b"pointBackward", "pointForward", b"pointForward", "start", b"start"]) -> None: ...

global___Line = Line

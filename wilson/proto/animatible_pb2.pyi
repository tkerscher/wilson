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
from wilson.proto import (
    line_pb2,
    overlay_pb2,
    sphere_pb2,
    tube_pb2
)

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

@typing_extensions.final
class Animatible(google.protobuf.message.Message):
    """Animatible object in the scene
    Common meta information
    """

    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    NAME_FIELD_NUMBER: builtins.int
    GROUPS_FIELD_NUMBER: builtins.int
    DESCRIPTION_FIELD_NUMBER: builtins.int
    SPHERE_FIELD_NUMBER: builtins.int
    LINE_FIELD_NUMBER: builtins.int
    TUBE_FIELD_NUMBER: builtins.int
    OVERLAY_FIELD_NUMBER: builtins.int
    name: builtins.str
    """Name as shown in explorer"""
    @property
    def groups(self) -> google.protobuf.internal.containers.RepeatedScalarFieldContainer[builtins.str]:
        """Name of groups this belongs to"""
    description: builtins.str
    """Additional text shown when selected"""
    @property
    def sphere(self) -> sphere_pb2.Sphere: ...
    @property
    def line(self) -> line_pb2.Line: ...
    @property
    def tube(self) -> tube_pb2.Tube: ...
    @property
    def overlay(self) -> overlay_pb2.Overlay: ...
    def __init__(
        self,
        *,
        name: builtins.str = ...,
        groups: collections.abc.Iterable[builtins.str] | None = ...,
        description: builtins.str = ...,
        sphere: sphere_pb2.Sphere | None = ...,
        line: line_pb2.Line | None = ...,
        tube: tube_pb2.Tube | None = ...,
        overlay: overlay_pb2.Overlay | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["instance", b"instance", "line", b"line", "overlay", b"overlay", "sphere", b"sphere", "tube", b"tube"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["description", b"description", "groups", b"groups", "instance", b"instance", "line", b"line", "name", b"name", "overlay", b"overlay", "sphere", b"sphere", "tube", b"tube"]) -> None: ...
    def WhichOneof(self, oneof_group: typing_extensions.Literal["instance", b"instance"]) -> typing_extensions.Literal["sphere", "line", "tube", "overlay"] | None: ...

global___Animatible = Animatible

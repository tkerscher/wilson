"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import google.protobuf.descriptor
import google.protobuf.message
import sys
from wilson.proto import properties_pb2

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

@typing_extensions.final
class Tube(google.protobuf.message.Message):
    """Tube in 3D space"""

    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    PATHID_FIELD_NUMBER: builtins.int
    ISGROWING_FIELD_NUMBER: builtins.int
    RADIUS_FIELD_NUMBER: builtins.int
    COLOR_FIELD_NUMBER: builtins.int
    pathId: builtins.int
    """Index of path to follow"""
    isGrowing: builtins.bool
    """True if the tube is growing with time,
    or false, if the tube is always drawn complete
    """
    @property
    def radius(self) -> properties_pb2.ScalarProperty:
        """Radius of the tube at a certain point identified by time"""
    @property
    def color(self) -> properties_pb2.ColorProperty:
        """Color of the tube at a certain point identified by time"""
    def __init__(
        self,
        *,
        pathId: builtins.int = ...,
        isGrowing: builtins.bool = ...,
        radius: properties_pb2.ScalarProperty | None = ...,
        color: properties_pb2.ColorProperty | None = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["color", b"color", "radius", b"radius"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["color", b"color", "isGrowing", b"isGrowing", "pathId", b"pathId", "radius", b"radius"]) -> None: ...

global___Tube = Tube

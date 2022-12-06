"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import google.protobuf.descriptor
import google.protobuf.message
import google.protobuf.timestamp_pb2
import sys

if sys.version_info >= (3, 8):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

@typing_extensions.final
class ProjectMeta(google.protobuf.message.Message):
    """Meta information about a project"""

    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    NAME_FIELD_NUMBER: builtins.int
    AUTHOR_FIELD_NUMBER: builtins.int
    DATE_FIELD_NUMBER: builtins.int
    STARTTIME_FIELD_NUMBER: builtins.int
    ENDTIME_FIELD_NUMBER: builtins.int
    SPEEDRATIO_FIELD_NUMBER: builtins.int
    DESCRIPTION_FIELD_NUMBER: builtins.int
    name: builtins.str
    """Name of the project"""
    author: builtins.str
    """Author of the project"""
    @property
    def date(self) -> google.protobuf.timestamp_pb2.Timestamp:
        """Date of event"""
    startTime: builtins.float
    """Time value, from which the animation starts"""
    endTime: builtins.float
    """Time value, where the animation ends"""
    speedRatio: builtins.float
    """Playback speed in time units per second"""
    description: builtins.str
    """additional description of the event"""
    def __init__(
        self,
        *,
        name: builtins.str = ...,
        author: builtins.str = ...,
        date: google.protobuf.timestamp_pb2.Timestamp | None = ...,
        startTime: builtins.float = ...,
        endTime: builtins.float = ...,
        speedRatio: builtins.float = ...,
        description: builtins.str = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["date", b"date"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["author", b"author", "date", b"date", "description", b"description", "endTime", b"endTime", "name", b"name", "speedRatio", b"speedRatio", "startTime", b"startTime"]) -> None: ...

global___ProjectMeta = ProjectMeta
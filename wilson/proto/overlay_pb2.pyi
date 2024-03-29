"""
@generated by mypy-protobuf.  Do not edit manually!
isort:skip_file
"""
import builtins
import google.protobuf.descriptor
import google.protobuf.internal.enum_type_wrapper
import google.protobuf.message
import sys
import typing
from wilson.proto import properties_pb2

if sys.version_info >= (3, 10):
    import typing as typing_extensions
else:
    import typing_extensions

DESCRIPTOR: google.protobuf.descriptor.FileDescriptor

class _TextPosition:
    ValueType = typing.NewType("ValueType", builtins.int)
    V: typing_extensions.TypeAlias = ValueType

class _TextPositionEnumTypeWrapper(google.protobuf.internal.enum_type_wrapper._EnumTypeWrapper[_TextPosition.ValueType], builtins.type):
    DESCRIPTOR: google.protobuf.descriptor.EnumDescriptor
    CENTER: _TextPosition.ValueType  # 0
    """Center of screen"""
    UPPER_RIGHT: _TextPosition.ValueType  # 1
    """Upper right corner"""
    TOP: _TextPosition.ValueType  # 2
    """Middle of top side"""
    UPPER_LEFT: _TextPosition.ValueType  # 3
    """Upper left corner"""
    LEFT: _TextPosition.ValueType  # 4
    """Middle of the left side"""
    LOWER_LEFT: _TextPosition.ValueType  # 5
    """Lower left corner"""
    BOTTOM: _TextPosition.ValueType  # 6
    """Middle of the bottom side"""
    LOWER_RIGHT: _TextPosition.ValueType  # 7
    """Lower right corner"""
    RIGHT: _TextPosition.ValueType  # 8
    """Middle of right side"""

class TextPosition(_TextPosition, metaclass=_TextPositionEnumTypeWrapper):
    """Text positioning"""

CENTER: TextPosition.ValueType  # 0
"""Center of screen"""
UPPER_RIGHT: TextPosition.ValueType  # 1
"""Upper right corner"""
TOP: TextPosition.ValueType  # 2
"""Middle of top side"""
UPPER_LEFT: TextPosition.ValueType  # 3
"""Upper left corner"""
LEFT: TextPosition.ValueType  # 4
"""Middle of the left side"""
LOWER_LEFT: TextPosition.ValueType  # 5
"""Lower left corner"""
BOTTOM: TextPosition.ValueType  # 6
"""Middle of the bottom side"""
LOWER_RIGHT: TextPosition.ValueType  # 7
"""Lower right corner"""
RIGHT: TextPosition.ValueType  # 8
"""Middle of right side"""
global___TextPosition = TextPosition

@typing_extensions.final
class Overlay(google.protobuf.message.Message):
    """Overlay text drawn on the scene surface"""

    DESCRIPTOR: google.protobuf.descriptor.Descriptor

    TEXT_FIELD_NUMBER: builtins.int
    POSITION_FIELD_NUMBER: builtins.int
    FONTSIZE_FIELD_NUMBER: builtins.int
    BOLD_FIELD_NUMBER: builtins.int
    ITALIC_FIELD_NUMBER: builtins.int
    text: builtins.str
    """Text to be drawn on the scene"""
    position: global___TextPosition.ValueType
    """Position of the text"""
    @property
    def fontSize(self) -> properties_pb2.ScalarProperty:
        """Font style"""
    bold: builtins.bool
    italic: builtins.bool
    def __init__(
        self,
        *,
        text: builtins.str = ...,
        position: global___TextPosition.ValueType = ...,
        fontSize: properties_pb2.ScalarProperty | None = ...,
        bold: builtins.bool = ...,
        italic: builtins.bool = ...,
    ) -> None: ...
    def HasField(self, field_name: typing_extensions.Literal["fontSize", b"fontSize"]) -> builtins.bool: ...
    def ClearField(self, field_name: typing_extensions.Literal["bold", b"bold", "fontSize", b"fontSize", "italic", b"italic", "position", b"position", "text", b"text"]) -> None: ...

global___Overlay = Overlay

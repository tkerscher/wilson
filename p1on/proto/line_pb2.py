# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: line.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import p1on.proto.properties_pb2 as properties__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\nline.proto\x12\x04p1on\x1a\x10properties.proto\"\xfe\x01\n\x04Line\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x02 \x01(\t\x12\x11\n\tisVisible\x18\x03 \x01(\x08\x12\"\n\x05\x63olor\x18\x04 \x01(\x0b\x32\x13.p1on.ColorProperty\x12#\n\x05start\x18\x05 \x01(\x0b\x32\x14.p1on.VectorProperty\x12!\n\x03\x65nd\x18\x06 \x01(\x0b\x32\x14.p1on.VectorProperty\x12\'\n\tlineWidth\x18\x07 \x01(\x0b\x32\x14.p1on.ScalarProperty\x12\x14\n\x0cpointForward\x18\x08 \x01(\x08\x12\x15\n\rpointBackward\x18\t \x01(\x08\x62\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'line_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _LINE._serialized_start=39
  _LINE._serialized_end=293
# @@protoc_insertion_point(module_scope)

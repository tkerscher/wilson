# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: label.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import p1on.proto.properties_pb2 as properties__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0blabel.proto\x12\x04p1on\x1a\x10properties.proto\"\xd6\x01\n\x05Label\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\r\n\x05group\x18\x02 \x01(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\x12\"\n\x05\x63olor\x18\x04 \x01(\x0b\x32\x13.p1on.ColorProperty\x12&\n\x08position\x18\n \x01(\x0b\x32\x14.p1on.VectorProperty\x12&\n\x08\x66ontSize\x18\x0b \x01(\x0b\x32\x14.p1on.ScalarProperty\x12\'\n\nbackground\x18\x0c \x01(\x0b\x32\x13.p1on.ColorPropertyb\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'label_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _LABEL._serialized_start=40
  _LABEL._serialized_end=254
# @@protoc_insertion_point(module_scope)

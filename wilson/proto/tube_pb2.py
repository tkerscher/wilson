# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: tube.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import wilson.proto.properties_pb2 as properties__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\ntube.proto\x12\x06wilson\x1a\x10properties.proto\"\xaa\x01\n\x04Tube\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x0e\n\x06groups\x18\x02 \x03(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\x12$\n\x05\x63olor\x18\x04 \x01(\x0b\x32\x15.wilson.ColorProperty\x12\x0e\n\x06pathId\x18\n \x01(\r\x12\x11\n\tisGrowing\x18\x0b \x01(\x08\x12&\n\x06radius\x18\x0c \x01(\x0b\x32\x16.wilson.ScalarPropertyb\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'tube_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _TUBE._serialized_start=41
  _TUBE._serialized_end=211
# @@protoc_insertion_point(module_scope)

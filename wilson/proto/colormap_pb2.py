# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: colormap.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import wilson.proto.color_pb2 as color__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0e\x63olormap.proto\x12\x06wilson\x1a\x0b\x63olor.proto\"e\n\x08\x43olorMap\x12$\n\x05stops\x18\x01 \x03(\x0b\x32\x15.wilson.ColorMap.Stop\x1a\x33\n\x04Stop\x12\r\n\x05value\x18\x01 \x01(\x01\x12\x1c\n\x05\x63olor\x18\x02 \x01(\x0b\x32\r.wilson.Colorb\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'colormap_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _COLORMAP._serialized_start=39
  _COLORMAP._serialized_end=140
  _COLORMAP_STOP._serialized_start=89
  _COLORMAP_STOP._serialized_end=140
# @@protoc_insertion_point(module_scope)

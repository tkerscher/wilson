# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: sphere.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


import wilson.proto.properties_pb2 as properties__pb2


DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0csphere.proto\x12\x06wilson\x1a\x10properties.proto\"\xb3\x01\n\x06Sphere\x12\x0c\n\x04name\x18\x01 \x01(\t\x12\x0e\n\x06groups\x18\x02 \x03(\t\x12\x13\n\x0b\x64\x65scription\x18\x03 \x01(\t\x12$\n\x05\x63olor\x18\x04 \x01(\x0b\x32\x15.wilson.ColorProperty\x12(\n\x08position\x18\n \x01(\x0b\x32\x16.wilson.VectorProperty\x12&\n\x06radius\x18\x0b \x01(\x0b\x32\x16.wilson.ScalarPropertyb\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'sphere_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  _SPHERE._serialized_start=43
  _SPHERE._serialized_end=222
# @@protoc_insertion_point(module_scope)

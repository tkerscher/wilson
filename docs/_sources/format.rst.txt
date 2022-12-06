File format
===========

Catalogue
---------

Wilson always expects catalogue files, but will open the first project if only
one is present.

A catalogue file is simply a zip archive containing the serialized projects
following the :ref:`datamodel`. The individual filenames do not matter. All the
meta information are loaded from the files themselves instead.

Stage
-----

Stage files uses the `GLB <https://docs.fileformat.com/3d/glb/>`_ format.

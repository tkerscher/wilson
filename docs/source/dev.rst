Developer Guide
===============

Here are some things listed to give you an entry point for contributing to
Wilson.

File Format
-----------

For changing the file format you should at least be familiar with
[Protocol Buffer](https://developers.google.com/protocol-buffers). Since changes
in the file format require changes in the Python package and Web App, you'll
most likely also need to be familiar with those, too.

A core design goal of the file format is the forward and backward compatibility.
To achieve this, you are allowed to add or delete entries in the file format as
long as you do not change existing or preexisting entries, i.e. changing the
format of a particular entry specified by its id.
Furthermore, both the Python package and Web App need to be able to tolerate
missing or default values. It must also be safe to ignore future entries.

Python Package
--------------

The python package is just a simple utility library providing some quality of
life features like numpy support. Thus, it should just reflect the file format.

Read the API to get an idea of the code design.

Web App
-------

The Web App has two (three) big components: The 3D rendering logic and the UI.
The third is the data model and gets (mostly) auto generated from the proto
files.

3D Rendering
^^^^^^^^^^^^

The 3D rendering logic is contained in the ``src/scene`` directory. The actual
implementation is coded against the ``Controller`` interface to allow loosely
coupling, with the concrete instances being registered in the factory function.
Currently, `Babylon JS <https://www.babylonjs.com/>`_ is used as the rendering
engine, but changing or extracting the code should be straight forward.

Scene creation is orchestrated from within the ``buildScene()`` function,
delegating control to builder functions inside ``objects`` for file format
specific objects (e.g. spheres or overlays) or ``components`` for UI relevant
objects (e.g. axis orientation or grid). Additions to the scene should be
organized accordingly.

There is also some code the animation depends on inside ``src/interpolation``.
Since this works without the concept of a 3D rendering engine, the code got
separated.

User Interface
^^^^^^^^^^^^^^

The User Interface uses the `Vue JS <https://vuejs.org/>`_ framework, which
introduces its own file format for creating HTML components, ending in ``.vue``.
It's rather intuitive, so a good look in to some of these files should give you
already a pretty good idea of it.

Style Guide
-----------

We are using linters to keep the styling consistent. They can be run via a yarn
script:

.. code-block:: console
    
    yarn lint # typescript
    yarn black # python


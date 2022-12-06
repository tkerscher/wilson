Python Package
==============

Wilson provides a python package that takes care of dealing with the
serialization into the binary format and allows to handle the data on a higher
level, e.g. by simply passing numpy arrays.

Example
-------

.. code-block:: ruby
   :linenos:
    
    import numpy as np
    import wilson

    r = 5.0
    t = np.linspace(0, 2*np.pi)
    x = r * np.cos(t)
    y = r * np.sin(t)
    z = np.zeros_like(t)

    path = np.column_stack((t, x, y, z))
    orbit = wilson.Path(path, name='Moon Orbit', interpolation='cubic')

    earth = wilson.Sphere('Earth', description="That's our planet!", radius=1.0, color='blue')
    moon = wilson.Sphere('Moon', description='Our oldest pal!', radius=0.27, color='grey')
    moon.position = orbit

    project = wilson.Project('Earth Moon',
        author='wilson',
        description='The Moon orbiting around the Earth.',
        animationSpeed=2*np.pi / 5.0,
        animatables=[earth, moon])
    project.clearColor = 'light yellow'

    wilson.saveProject(project, '../examples/earth_moon.wlsn')

See notebooks for a detailed instructions.

API
---

.. automodule:: wilson.catalogue
    :members:
    :undoc-members:

.. automodule:: wilson.color
   :members:
   :undoc-members:

.. automodule:: wilson.data
   :members:
   :undoc-members:

.. automodule:: wilson.objects
   :members:
   :undoc-members:

.. automodule:: wilson.parse
   :members:
   :undoc-members:

.. automodule:: wilson.project
   :members:
   :undoc-members:

.. automodule:: wilson.serialize
   :members:
   :undoc-members:

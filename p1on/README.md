# P1ON Python Package

Python package for creating P1ON animations. See `notebooks` folder for example.

## Usage

A simple example for creating an animation:
```python
import numpy as np
import p1on

r = 5.0
t = np.linspace(0, 2*np.pi)
x = r * np.cos(t)
y = r * np.sin(t)
z = np.zeros_like(t)

path = np.column_stack((t, x, y, z))
orbit = p1on.Path(path, name='Moon Orbit', interpolation='cubic')

earth = p1on.Sphere('Earth', description="That's our planet!", radius=1.0, color='blue')
moon = p1on.Sphere('Moon', description='Our oldest pal!', radius=0.27, color='grey')
moon.position = orbit

project = p1on.Project('Earth Moon',
    author='p1on',
    description='The Moon orbiting around the Earth.',
    animationSpeed=2*np.pi / 5.0,
    animatables=[earth, moon])
project.clearColor = 'light yellow'

p1on.saveProject(project, '../examples/earth_moon.p1on')
```

# Known Issues

Parsing a project and immediately serializing it again might produce a different
result. This is due to protobuf returning default values for missing properties
of a built-in type (i.e. string, float, etc.).

While it is possible to circumvent this, it would bloat the protobuf files and
was thus not done.

## TODO

The package lacks early type check which might makes debugging software using a
bit more tedious. Nevertheless, the output is guaranteed to meet the protocol as
this is assured by protobuf.

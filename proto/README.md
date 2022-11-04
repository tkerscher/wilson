# Data Model

The data model is defined using Google's [Protocol Buffers](https://developers.google.com/protocol-buffers).

## Compile

To compile the `.proto` files into the typescript files needed you can simply run

```bash
yarn protoc #unix
yarn protoc_win #windows
```

To compile them instead into python files run

```bash
yarn protopy
```

You need to have `protoc` installed and accessible through the path variable.
Since the data model should not change very much, we will include the compiled
files in the repository to speed things up and make installation easier.

If you want to compile the data model into a different language you only need to
compile the root file `project.proto` as it imports all other files.

## Data Types

### Fundamental Types

There are three fundamental data types:

|Type    | Description   |
|--------|---------------|
| Color  | RGBA value containing red, green, blue and alpha as `floats` (0,1). Values outside the range are clamped. The alpha channel controls transparency where 0 means transparent and 1 completely opaque.  |
| Vector | 3D vector consisting of a x, y and z component stored as `doubles`. Can either denote a point or direction in 3D space.|
| Time   | Time is counted in nanoseconds from the start of the event and is stored as `double`. |

### Table types

Table types contain actual measured or simulated data, either as a graph or
path. Both store the data as a table of interpolation point by assigning
discrete points in time a value of its corresponding scalar type.

| Type  | Scalar   |  Description                                    |
|-------|----------|-------------------------------------------------|
| Graph | `double` | Function of time mapping to a scalar `T -> R`   |
| Path  | `Vector` | Function of time mapping to a vector `T -> R^3` |

Each table also has a unique `id` stored as `uint32`, which can be used to
reference it by other objects, as well as a human readable `name` string.

### Color Map

There is also a global `ColorMap` which is used to translate scalars used in
`ColorProperties` into actual Colors. Similar to the table types it has a list
of color stops mapping `double` to `Color`.

### Properties

Properties are a special data type, which denotes that a value can either be
const scalar or are calculated based on a table referenced by its `id`.

There are three types of properties:

| Property       | Scalar               | Table   |
|----------------|----------------------|---------|
| ScalarProperty | `double`             | `Graph` |
| VectorProperty | `Vector`             | `Path`  |
| ColorProperty  | `Color` or `double`  | `Graph` |

The `ColorProperty` is somewhat special, as its scalar is not the same as the
table's it's referencing. The conversion between the `double` given or
calculated from the referenced `Graph` and the expected `Color` is done using
the color map stored in the project root object.

### Text

The `Text` type is a string that may contain template expressions. A template
expression can reference data in the project, namely `Graph` and `Path`, by
their ids. Such an expression looks like the following:

`%(paths[0].x).2e`

It consists of `%()` containing the data to be referenced, i.e. either `graphs`
or `paths` followed by the corresponding id in square brackets and additionally
for paths the dimension (e.g. here `.x`). Optionally, the reference can be
followed by a formatting instruction. Here it is `.2e`, i.e scientific notation
with 2 decimal places.

Multiple references can be embedded into any string to form a valid text
property:

`Current height: %(paths[0].z).2f m after %(graphs[4]).3f ms`

Of course, a plain string with no references is also a valid Text:

`Test #042`

## Objects

The data as defined before can be used to animate objects which will be drawn in
a 3D scene.

All objects have a common set of properties:

| Property    | ID | Type     | Description |
|-------------|----|----------|-------------|
| name        | 01 | `string` | Name to be shown in the explorer. |
| group       | 02 | `string` | Name of the group the objects belong to. |
| description | 03 | `Text`   | Text to be shown when the object is selected in the scene. |
| color       | 04 | `ColorProperty` | Color of the object. |
|             | 05 - 10 | | *Reserved* |

There are five types of objects:

### Sphere

A simple Sphere.

| Property | Type             | Description |
|----------|------------------|-------------|
| position | `VectorProperty` | Center of the sphere. |
| radius   | `ScalarProperty` | Radius of the sphere. |

### Line

A line connection two points.

| Property | Type             | Description |
|----------|------------------|-------------|
| start    | `VectorProperty` | Start point of the line. |
| end      | `VectorProperty` | End point of the line. |
| lineWidth| `ScalarProperty` | Diameter of the line. |
| pointForward | `bool`       | True, if it should point toward start. |
| pointBackward| `bool`       | True, if it should point toward end. |

If both `pointForward` and `pointBackward` are set, the line will point in
both direction.

### Tube

A Tube following a path with variable coloring and diameter.

| Property | Type             | Description |
|----------|------------------|-------------|
| pathId   | `uint32`         | Id of the `Path` the tube should follow. |
| isGrowing| `bool`           | `true`, if the tube should grow in time, or `false` if the whole path should be drawn at all times. |
| radius   | `ScalarProperty` | The radius of the tube. |

Tubes are special as their properties are not function of time, but of position. The position is
determined using the by `pathId` referenced `Path`. The corresponding time is used to evaluate the
other properties. I.e. at a time t, the position of the current tube segment is determined by the
referenced `Path`, while the other properties are evaluated using the same time t.

### Overlay

Overlay show text drawn on top of the scene. If multiple overlays share the same
position they'll be stacked.

| Property | Type             | Description                     |
|----------|------------------|---------------------------------|
| text     | `Text`           | Text to be drawn on scene.      |
| position | `TextPosition`   | Position of the text.           |
| fontSize | `ScalarProperty` | Size of the text.               |
| bold     | `bool`           | True, if text should be bold.   |
| italic   | `bool`           | True, if text should be italic. |

The `TextPosition` type is a simple enumeration of all possible positions:

 |             |             |             |
 |-------------|-------------|-------------|
 | Upper Left  | Top         | Upper Right |
 | Left        | Center      | Right       |
 | Lower Left  | Bottom      | Lower Right |

## Project Description

The root message for serialization is `Project` and is foremost a container for the tables and
objects. Thus it contains arrays of the following types:

- Data
  - `Graph`
  - `Path`
  - `ColorMap`
- Objects
  - `Sphere`
  - `Line`
  - `Tube`
  - `Overlay`

### Meta information

The project also contains a message `ProjectMeta` at tag 0 which holds additional
information for the end user about the animated event:

| Property   | Type        | Description |
|------------|-------------|-------------|
| name       | `string`    | Name of the event |
| author     | `string`    | Name of the author, e.g. the experiments name. |
| data       | `Timestamp` | Date of the event. |
| startTime  | `double`    | Time value the animation should start with. |
| endTime    | `double`    | Time value at which the animation should end. |
| speedRatio | `double`    | Speed of animation in time units per second. |
| description| `string`    | Additional description about the event. |

### Scene Settings

Finally, there are some properties in `Project` providing additional information
on how to render the scene:

| Property       | Type       | Description |
|----------------|------------|-------------|
| camera         | `Camera`   | An optional camera. A default one is used if not provided. |
| hiddenGroups   | `string[]` | List of groups that should be hidden at default. |

The `Camera` is a rather simple structure, which can also be animated:

| Property | Type             | Description                       |
|----------|------------------|-----------------------------------|
| position | `VectorProperty` | Position of the camera.           |
| target   | `VectorProperty` | The position the camera looks at. |

# <img src="public/banner.png" height=150>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

Wilson is a 3D visualization tool aimed for (astro) particle physics. It
provides a python package for creating event files / catalogues and a static web
based app for viewing them in your browser written using TypeScript.

## Installation

### Install Python Package

The Python package is hosted on [PyPI](https://pypi.org/) and can simply be
installed using `pip`:

```bash
pip install wilson3d
```

Note that it is `wilson3d` not `wilson`.

### Install Web App

For deployment, it's enough to just copy the build files onto your server. Since
it's a static app, a simple file serving is enough.

You can also run the app locally if you have installed the Python package using
a command line:

```bash
wilson
```

You can also pass a file or directory to serve. If you pass a file a new tab in
your browser should open showing the file:

```bash
wilson event.wlsn
```

## Building

### Build Python Package

For building the python package a npm script is provided.
On Linux using yarn you can simply run

```bash
yarn buildpy
```

This handles several steps:

1. Builds the web app, as it is used within the Python package
2. Bundles the web app into `app.zip` stored in the package root source directory
3. Runs `python3 -m build`
4. Checks the build via `python3 -m twine check dist/wilson*`

After building finished, you can install it via

```bash
pip install dist/wilson*.whl
```

### Build Web App

1. Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/).
It will handle all further steps for you through its CLI.
2. Fetch dependencies by running `yarn` from the repository root
3. Issue the build command via `yarn build`
4. The build files are now in the `dist` subdirectory.

### Build Documentation

The documentation is generated via [Sphinx](https://www.sphinx-doc.org/en/master/).
To install the necessary dependencies you can simply run:

```bash
pip install -r docs/requirements.txt
```

Afterwards you can build the documentation via

```bash
cd docs
make html
```

## Code Style

The repository uses static code analyzing tools like linters. Namely they are:

- [ESLint](https://eslint.org/)
- [MyPy](http://mypy-lang.org/)
- [Black](https://github.com/psf/black)

There exist yarn scripts for easier use:

```bash
yarn lint # typescript
yarn black # python black
```

## File Format

See [proto](/proto) for a detailed description of the event file format.

## Dependencies

### Python Dependencies

#### Python Build Dependencies

- [cmasher](https://cmasher.readthedocs.io/)
- [numpy](https://numpy.org/)
- [protobuf](https://developers.google.com/protocol-buffers/)

### Python Develop Dependencies

- [black](https://github.com/psf/black)
- [mypy](http://mypy-lang.org/)
- [sphinx](https://www.sphinx-doc.org/en/master/)
- [types-protobuf](https://pypi.org/project/types-protobuf/)
  
### Web App Dependencies

#### TypeScript Build Dependencies

- [BabylonJS](https://www.babylonjs.com/)
- [JSZip](https://github.com/Stuk/jszip)
- [Mitt](https://github.com/developit/mitt)
- [Pinia](https://pinia.vuejs.org/)
- [Plotly](https://plotly.com/javascript/)
- [protobuf.js](https://github.com/protobufjs/protobuf.js/)
- [sprintf.js](https://github.com/alexei/sprintf.js)
- [Vue.js](https://vuejs.org/)

#### TypeScript Develop Dependencies

- [ESLint](https://eslint.org/)
- [ts-proto](https://github.com/stephenh/ts-proto)
- [Vite](https://vitejs.dev/)

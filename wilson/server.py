import importlib.resources
import os.path
import urllib.parse
import webbrowser
from functools import partial
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Optional
from zipfile import ZipFile

def _extractPath(requestPath: str):
    query_start = requestPath.find("?")
    if query_start == -1:
        query_start = None
    return requestPath[1:query_start]

class Response():
    """Helper class for creating http responses"""

    def __init__(
            self,
            status = 200,
            content = b"",
            contentType = "text/plain"
    ):
        self.status = status
        self.content = content
        self.contentType = contentType
    
    def send(self, handler: BaseHTTPRequestHandler, headOnly=False):
        handler.send_response(self.status)
        handler.send_header("Content-Length", len(self.content))
        handler.send_header("Content-Type", self.contentType)
        handler.end_headers()
        if not headOnly:
            handler.wfile.write(self.content)

NOT_FOUND_HTML = b"""\
<!DOCTYPE html>
<html lang="en">
   <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="./favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>404 Not Found - Wilson</title>
        <style>
			body {
				font-family: Avenir, Helvetica, Arial, sans-serif;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				text-align: center;
			}
            #main {
               margin: auto;
            }
			h1 {
				font-size: 48px;
			}
        </style>
    </head>
    <body>
        <div id="main">
            <h1 class="status">Error 404</h1>
            <h4>The requested resource does not exist</h4>
        </div>
    </body>
</html>
"""

class BadResponse(Response):
    """Response for 404"""
    def __init__(self):
        super().__init__(404, NOT_FOUND_HTML, "text/html")

class AppHandler():
    """class handling look-ups for app files"""

    CONTENT_TYPE = {
        ".css": "text/css",
        ".html": "text/html",
        ".ico": "image/vnd.microsoft.icon",
        ".js": "text/javascript",
        ".png": "image/png",
        ".svg": "image/svg+xml"
    }

    def __init__(self):
        app_path = importlib.resources.files("wilson").joinpath("app.zip")
        self._app_file = app_path.open(mode="rb")
        self._archive = ZipFile(self._app_file)
    
    def __del__(self):
        self._archive.close()
        if not self._app_file.closed:
            self._app_file.close()
    
    def __call__(self, handler: BaseHTTPRequestHandler) -> Optional[Response]:
        resource = _extractPath(handler.path)
        # special: index.html mapped to root
        if resource == "":
            resource = "index.html"
        # see if resource is inside the zip archive
        if resource in self._archive.namelist():
            ext = os.path.splitext(resource)[1]
            contentType = AppHandler.CONTENT_TYPE.get(ext, "text/plain")
            content = None
            with self._archive.open(resource) as f:
                content = f.read()
            return Response(200, content, contentType)
        else:
            return None

class DirectoryHandler():
    """Class for serving files from a directory."""

    def __init__(self, path: str):
        self._path = path
    
    def __call__(self, handler: BaseHTTPRequestHandler) -> Optional[Response]:
        resource = _extractPath(handler.path)
        # refresh file list with every request
        # only serve local files not nested ones
        files = [f for f in os.listdir(self._path) if os.path.isfile(os.path.join(self._path, f))]
        if resource in files:
            path = os.path.join(self._path, resource)
            content = None
            with open(path, mode="rb") as f:
                content = f.read()
            return Response(200, content)
        else:
            return None
class FileHandler():
    """Class for serving a single file."""

    def __init__(self, path: str):
        self._path = path
        self._file = os.path.basename(path)
    
    def __call__(self, handler: BaseHTTPRequestHandler) -> Optional[Response]:
        resource = _extractPath(handler.path)
        if resource == self._file:
            content = None
            with open(self._path, mode="rb") as f:
                content = f.read()
            return Response(200, content, "application/octet-stream")
        else:
            return None

class WilsonRequestHandler(BaseHTTPRequestHandler):
    """Class handling the http request for the server"""

    def __init__(self, *args, path=None, **kwargs):
        self._stages = []
        self._stages.append(AppHandler())
        if path is not None:
            if os.path.isfile(path):
                self._stages.append(FileHandler(path))
            elif os.path.isdir(path):
                self._stages.append(DirectoryHandler(path))
        
        super().__init__(*args)

    def do_HEAD(self):
        self.createResponse().send(self, headOnly=True)
    
    def do_GET(self):
        self.createResponse().send(self)
    
    def createResponse(self) -> Response:
        for stage in self._stages:
            response = stage(self)
            if response is not None:
                return response
        # not found
        return BadResponse()


def run(port: int, path: Optional[str] = None):
    """
    Runs a local server hosting the web viewer app.
    Note that this function does NOT return.
    """
    handler = partial(WilsonRequestHandler, path=path)
    server = ThreadingHTTPServer(("localhost", port), handler)
    port = server.server_port
    print(f"Started server at location: http://localhost:{port}/")
    if path is not None and os.path.isfile(path):
        filename = os.path.basename(path)
        filename = urllib.parse.quote(filename)
        url = f"http://localhost:{port}/?cat={filename}"
        print(f"Event available under {url}")
        webbrowser.open_new_tab(url)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    server.server_close()
    print("Server has shut down")

def cli_main():
    """Function called by the `wilson` command."""
    import argparse
    
    def PathType(path):
        if os.path.exists(path) and (os.path.isfile(path) or os.path.isdir(path)):
            return path
        else:
            raise argparse.ArgumentTypeError("The given path is neither a file nor directory!")

    parser = argparse.ArgumentParser(prog="wilson",
        description="Serves the Wilson viewer web app under localhost")
    parser.add_argument("--port", "-p", action="store",
                        default=0, type=int, nargs="?",
                        help="Specify explicit port")
    parser.add_argument("path", nargs="?", type=PathType, default=None,
                        help="Directory or file to serve alongside the viewer.")
    args = parser.parse_args()

    run(args.port, args.path)

if __name__ == '__main__':
    cli_main()

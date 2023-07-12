import importlib.resources
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from os.path import splitext
from typing import Optional
from zipfile import ZipFile

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
        query_start = handler.path.find("?")
        if query_start == -1:
            query_start = None
        resource = handler.path[1:query_start]
        # special: index.html mapped to root
        if resource == "":
            resource = "index.html"
        # see if resource is inside the zip archive
        if resource in self._archive.namelist():
            contentType = AppHandler.CONTENT_TYPE.get(splitext(resource)[1], "text/plain")
            content = None
            with self._archive.open(resource) as f:
                content = f.read()
            return Response(200, content, contentType)
        else:
            return None

class WilsonRequestHandler(BaseHTTPRequestHandler):
    """Class handling the http request for the server"""

    def __init__(self, *args, **kwargs):
        self._app = AppHandler()
        self._bad = BadResponse()
        super().__init__(*args)

    def do_HEAD(self):
        self.createResponse().send(self, headOnly=True)
    
    def do_GET(self):
        self.createResponse().send(self)
    
    def do_PUT(self):
        return
    
    def createResponse(self) -> Response:
        return self._app(self) or self._bad

def run():
    """
    Runs a local server hosting the web viewer app.
    Note that this function does NOT return.
    """
    server = ThreadingHTTPServer(("localhost", 8080), WilsonRequestHandler)
    print(f"Started server at location: http://localhost:{server.server_port}/")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    server.server_close()
    print("Server has shut down")

if __name__ == '__main__':
    run()

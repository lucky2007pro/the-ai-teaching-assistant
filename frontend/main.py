"""
Mentor LMS — Standalone Frontend Dev Server
Run with: python main.py (inside frontend directory)
Access at: http://localhost:3000
"""

import http.server
import os
import socketserver
import sys
from pathlib import Path

PORT = 3000
DIRECTORY = Path(__file__).resolve().parent


class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def translate_path(self, path):
        # Standard translation
        translated = super().translate_path(path)

        # If direct file/folder exists, serve it
        if os.path.exists(translated):
            return translated

        # Clean query parameters and trailing slashes
        clean_path = path.split("?")[0].rstrip("/")
        if clean_path:
            filename = clean_path.lstrip("/")
            html_candidate = str(DIRECTORY / f"{filename}.html")
            if os.path.exists(html_candidate):
                return html_candidate

        # Fallback to index.html for SPA routing
        index_path = str(DIRECTORY / "index.html")
        if os.path.exists(index_path):
            return index_path

        return translated

    def end_headers(self):
        # Disable caching for dev server
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()



def run_server(port=PORT):
    os.chdir(DIRECTORY)
    handler = CustomHTTPRequestHandler
    with socketserver.TCPServer(("", port), handler) as httpd:
        print("=" * 60)
        print(f"🚀 Mentor LMS Frontend Server running at:")
        print(f"👉 http://localhost:{port}")
        print(f"👉 http://127.0.0.1:{port}")
        print(f"📁 Root directory: {DIRECTORY}")
        print("=" * 60)
        print("Press Ctrl+C to stop the server.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Frontend server stopped.")
            sys.exit(0)


if __name__ == "__main__":
    run_server()

import time
from http.server import HTTPServer
from http.server import BaseHTTPRequestHandler


class Server(BaseHTTPRequestHandler):
  def do_HEAD(self):
    return
  def do_POST(self):
    return
  def do_GET(self):
    print(self.path)
    self.send_response(301)
    self.send_header('Location', 'http://192.168.43.13/web/index2.html')
    self.end_headers()
 

HOST_NAME = '0.0.0.0'
PORT_NUMBER = 8000


httpd = HTTPServer((HOST_NAME, PORT_NUMBER), Server)
print(time.asctime(), 'Server UP - %s:%s' % (HOST_NAME, PORT_NUMBER))
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    pass
httpd.server_close()
print(time.asctime(), 'Server DOWN - %s:%s' % (HOST_NAME, PORT_NUMBER))

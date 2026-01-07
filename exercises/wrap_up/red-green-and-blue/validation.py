# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice Job!"}

if not "red: 3\ngreen: 2\nblue: 4\n" in ''.join(_output):
  status["done"] = False
  status["message"] = "Try again!"
status

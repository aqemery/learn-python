# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice Job!"}

if not "You are awesome!\n" in _output:
  status["done"] = False
  status["message"] = "Try again!"
status

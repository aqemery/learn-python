# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice Job!"}

if not "Simon is carrying the most with 594 pounds\n" in _output:
  status["done"] = False
  status["message"] = "Try again!"
status

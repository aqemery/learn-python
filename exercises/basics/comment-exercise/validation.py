# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice Job!"}
if not ["print this line\n"] == _output:
  status["message"] = 'hmmm, you printed something unexpected'
  status["done"] = False
status

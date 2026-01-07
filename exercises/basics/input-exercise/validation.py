# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice Job!"}
if not 'name' in globals():
  status["message"] = "hmmm, did create a name variable?"
  status["done"] = False
elif not isinstance(name, str):
  status["message"] = "hmmm, did you assign a string to the name variable?"
  status["done"] = False
else:
  status = {"done": True, "message": f"Nice Job, {name}! I hope you are enjoying the course so far."}
status

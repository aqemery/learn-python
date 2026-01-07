status = {"done": True, "message": "Nice Job!"}
_post_globals = set(globals())
_new_globals = _post_globals - _pre_globals
global_types = [type(globals()[g]) for g in _new_globals]

if not int in global_types:
  status["message"] = 'hmmm, did you create an integer variable?'
  status["done"] = False
elif not float in global_types:
  status["message"] = 'hmmm, did you create a float variable?'
  status["done"] = False
elif not str in global_types:
  status["message"] = 'hmmm, did you create a string variable?'
  status["done"] = False

if existing_variable == "This is the original value":
  status["message"] = 'hmmm, did you reassign the existing variable?'
  status["done"] = False

status

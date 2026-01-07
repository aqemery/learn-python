# _output is automatically available - it contains a list of all printed lines
status = {"done": False, "message": _fail}

print("**", _message, _output)
if _message in _output:
    status['done'] = True
    status['message'] = "Nice job!"
status

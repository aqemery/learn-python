# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice job!"}
if not 'x is greater than or equal to 6\n' in _output:
    status['done'] = False
    status['message'] = "Try again!"
status

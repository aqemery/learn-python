# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice job!"}

if not '0123456789\n' in ''.join(_output):
        status['done'] = False
        status['message'] = "Hmm, try again."
status

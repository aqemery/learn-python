# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice job!"}

_total = 0
if x:
    _total += x
if y:
    _total += y
if z:
    _total += z

if not f'{_total}\n' in _output:
    status['done'] = False
    status['message'] = "Hmm, Try again!"

status

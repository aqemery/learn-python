# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice job!"}

if x > 10 and y > 10:
    if not 'step 1 is True\n' in _output:
        status['done'] = False
        status['message'] = "Hmm, step 1 is True, but you didn't print it."
else:
    if 'step 1 is True\n' in _output:
        status['done'] = False
        status['message'] = "Hmm, step 1 should be False"
if z > x or y > x:
    if not 'step 2 is True\n' in _output:
        status['done'] = False
        status['message'] = "Hmm, step 2 is True, but you didn't print it."
    if 'step 2 is False\n' in _output:
        status['done'] = False
        status['message'] = "Hmm, step 2 should be True"
else:
    if not 'step 2 is False\n' in _output:
        status['done'] = False
        status['message'] = "Hmm, step 2 is False, but you didn't print it."
    if 'step 2 is True\n' in _output:
        status['done'] = False
        status['message'] = "Hmm, step 2 should be False"
status

# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice job!"}
check_vals = [str(i) + '\n' for i in range(10)]

for val in check_vals:
    if not val in _output:
        status['done'] = False
        status['message'] = "Try again!"
        break

if '10\n' in _output:
        status['done'] = False
        status['message'] = "Hmm, you're printing 10. Try again!"
status

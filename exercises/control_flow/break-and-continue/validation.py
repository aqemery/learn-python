# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice job!"}
check_vals = [str(i) + '\n' for i in range(0,x+1,2) if i <= 20]

if '1\n' in _output:
        status['done'] = False
        status['message'] = "Hmm, you printed an odd number. Try again!"

for val in check_vals:
    if not val in _output:
        status['done'] = False
        status['message'] = "Try again!"
        break

too_far = x + 1
if x % 2 == 1:
    x += 1

if f'{too_far}\n' in _output:
    status['done'] = False
    status['message'] = "Hmm, you printed too many numbers. Try again!"


if '22\n' in _output:
        status['done'] = False
        status['message'] = "Hmm, you printed a number greater than 20. Try again!"
status

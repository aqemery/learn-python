# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice job!"}

import math

joined_out = ' '.join(_output)
if not f'{math.sqrt(90)}' in joined_out:
    status['done'] = False
    status['message'] = "hmm, did you print the square root of 90?"

status

# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice job!"}

import os
joined_out = ' '.join(_output)
if not os.getenv("HOME") in joined_out:
    status['done'] = False
    status['message'] = "hmm, did you print the HOME directory?"

status

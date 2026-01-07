# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice job!"}

import sys

joined_out = ' '.join(_output)
if not f'{sys.version}' in joined_out:
    status['done'] = False
    status['message'] = "hmm, did you print the version?"

if not f'{sys.platform}' in joined_out:
    status['done'] = False
    status['message'] = "hmm, did you print the platform?"

status

# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice job!"}

if x is None:
    status['done'] = False
    status['message'] = "hmm, did you create a random number named 'x'?"
else:
  _names =['one', 'two', 'three', 'four']
  if not f'{_names[x-1]}\n' in _output:
      status['done'] = False
      status['message'] = f"hmm, did you print the number as a word?"

status

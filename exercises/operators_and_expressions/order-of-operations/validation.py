# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice Job!"}


if not f'8 = 8\n' in _output or not f'6 = 6\n' in _output or not f'4 = 4\n' in _output:
  status = {"done": False, "message": "hmm, not all the expressions are correct"}
status

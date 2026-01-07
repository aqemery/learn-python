# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice Job!"}
try:
  if not counts == {number: _numbers.count(number) for number in _numbers}:
    status = {"done": False, "message": "hmm, that doesn't look right"}
except NameError:
  status = {"done": False, "message": "hmm, you didn't create a variable called counts"}
status

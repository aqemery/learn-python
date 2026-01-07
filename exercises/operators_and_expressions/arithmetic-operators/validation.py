# _output is automatically available - it contains a list of all printed lines
x, y = _xV, _yV
status = {"done": True, "message": "Nice Job!"}
step1 = x * y
step2 = step1 / 1.5
step3 = step2 + 20
step4 = step3 - 10

if not f'{step1}\n' in _output:
  status = {"done": False, "message": "hmm, not seeing the correct value for step 1"}
elif not f'{step2}\n' in _output:
  status = {"done": False, "message": "hmm, not seeing the correct value for step 2"}
elif not f'{step3}\n' in _output:
  status = {"done": False, "message": "hmm, not seeing the correct value for step 3"}
elif not f'{step4}\n' in _output:
  status = {"done": False, "message": "hmm, not seeing the correct value for step 4"}
status

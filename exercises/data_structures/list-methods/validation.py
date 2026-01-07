# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice Job!"}
_hidden.append(5)
_hidden.remove(2)
_hidden.sort()

if not numbers == [4,5,6]:
  status = {"done": False, "message": "hmm, not seeing the correct value for numbers"}

elif not hidden == _hidden:
  status = {"done": False, "message": "hmm, not seeing the correct value for hidden"}
status

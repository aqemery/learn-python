# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice Job!"}
import statistics
if not f"{statistics.median(_numbers)}\n" in _output:
  if len(_numbers) % 2 == 0:
    status = {"done": False, "message": "hmm, that doesn't look right for even length sequences"}
  else:
    status = {"done": False, "message": "hmm, that doesn't look right"}
status

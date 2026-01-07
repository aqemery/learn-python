# _output is automatically available - it contains a list of all printed lines
import random
x = random.randint(0, 30)
y = random.randint(0, 30)
status = {"done": True, "message": "Nice job!"}


if not "add" in globals():
    status['done'] = False
    status['message'] = "Hmm, did you define a function named add?"
else:
  add(x, y) == x + y
  if add(x, y) != x + y:
          status['done'] = False
          status['message'] = "Hmm, try again."
status

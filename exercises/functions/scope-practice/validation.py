# _output is automatically available - it contains a list of all printed lines
import random
x = random.randint(0, 30)
_x = x
status = {"done": True, "message": "Nice job!"}

if "add_one" in globals() and "add_two" in globals():

  try:
    add_one()
    add_one()
    add_one()
    x += add_two(x)
    x += add_two(x)

    _x += 3
    _x += _x + 2
    _x += _x + 2


    if x != _x:
            status['done'] = False
            status['message'] = "Hmm, try again."
  except UnboundLocalError:
    status['done'] = False
    status['message'] = "Hmm, did you use the global keyword?"
  except TypeError:
    status['done'] = False
    status['message'] = "Hmm, do you have the correct number arguments and return for add_two?"

else:
  status['done'] = False
  status['message'] = "Hmm, did you define the functions named add_one and add_two?"
status

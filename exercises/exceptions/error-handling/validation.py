# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice Job!"}

if divide(5, 0) != "ZeroDivisionError":
  status["done"] = False
  status["message"] = "hmm, The divide function should return the error type when dividing by zero."

if divide(5, "0") != "TypeError":
  status["done"] = False
  status["message"] = "hmm,The divide function should return the error type when dividing by a string."

if getValue([1, 2, 3], 5) != "IndexError":
  status["done"] = False
  status["message"] = "The getValue function should return the error type when getting an index that is out of range."

if getValue({"a": 1, "b": 2}, "c") != "KeyError":
  status["done"] = False
  status["message"] = "The getValue function should return the error type when getting a key that doesn't exist."

status

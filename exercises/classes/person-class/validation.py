# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice Job!"}
try:
  joe = Person("jimmy", 45)
  joe.introduce()
  if not "Hi, My name is jimmy and I am 45 years old.\n" in _output:
    status = {"done": False, "message": "hmm, that doesn't look right"}
except Exception as e:
  status = {"done": False, "message": "Something went wrong. Check your code and try again."}
status

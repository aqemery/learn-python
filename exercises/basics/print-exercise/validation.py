# _output is automatically available - it contains a list of all printed lines
status = {"done": False, "message": "Nice Job!"}
if not "123\n" in _output:
  status["message"] = 'hmmm, did you print 123?'
elif not "1.234\n" in _output:
  status["message"] = 'hmmm, did you print 1.234?'
elif not "Hello, World!\n" in _output:
  status["message"] = 'hmmm, did you print "Hello, World!"?'
else:
  status["done"] = True
status

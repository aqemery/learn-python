# _output is automatically available - it contains a list of all printed lines
status = {"done": True, "message": "Nice Job!"}
try:
  if not numbers == {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} - set(_to_remove):
    status = {"done": False, "message": "hmm, that doesn't look right"}
except NameError:
  status = {"done": False, "message": "hmm, you didn't create a variable called numbers"}
status

import random
numbers = [random.randint(1, 100) for _ in range(random.randint(7, 14))]
_numbers = numbers.copy()
if random.randint(0, 1) == 0:
  numbers = tuple(numbers)

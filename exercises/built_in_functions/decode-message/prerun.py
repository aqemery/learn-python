secret = "You are awesome!"

# convert to int
l = [ord(c) for c in secret]
l = [b - a for a, b in enumerate(l)]

l = [x*5 for x in l]
l = list(reversed(l))

import random

key = [random.randint(1,100) for x in range(len(secret))]


l = [a-b for a, b in zip(l, key)]
l = [random.choice([1,-1])*x for x in l]
secret = l

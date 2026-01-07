import random
values = random.randint(0, 30)
if values < 5:
    x = None
    y = None
    z = random.randint(10, 30)
elif values < 10:
    x = random.randint(10, 30)
    y = None
    z = random.randint(10, 30)
elif values < 20:
    x = None
    y = random.randint(10, 30)
    z = random.randint(10, 30)
else:
    x = random.randint(10, 30)
    y = random.randint(10, 30)
    z = random.randint(10, 30)

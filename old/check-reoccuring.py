import json
with open('data/spawns.json') as json_data:
    d = json.load(json_data)

keys = []
for i in range(len(d)):
    for key in d[i]:
        if key not in keys:
            keys.append(key)
print(keys)


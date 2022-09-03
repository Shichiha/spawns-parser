import json
with open('data/spawns.json') as json_data:
    d = json.load(json_data)
toplevel = d[0].keys()
for i in range(1, len(d)):
    if d[i].keys() != toplevel:
        print("toplevel keys are not the same at " + str(i))
print(f'{len(d)} keys')

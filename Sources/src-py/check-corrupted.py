import json
with open('../../data/Spawns.json') as json_data:
    d = json.load(json_data)
toplevel = d[0].keys()
corrupted = False
for i in range(1, len(d)):
    if d[i].keys() != toplevel:
        print("toplevel keys are not the same at " + str(i))
        corrupted = True

print("not corrupted" if not corrupted else "corrupted", end=" | ")
print(f'{len(d)} keys')

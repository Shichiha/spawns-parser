import os,sys,json
with open(os.path.join(os.path.dirname(__file__), "../../data/spawns.json"), "r") as inp:
    parsed_spawns = {}
    for scene in json.load(inp):
        for spawn in scene["spawns"]: parsed_spawns.setdefault(spawn["monsterId"], []).append([spawn["pos"]["x"], spawn["pos"]["y"], spawn["pos"]["z"]])
    with open(os.path.join(os.path.dirname(__file__), "../../parsed/parsedSpawns.json"), "w") as out:
        json.dump(parsed_spawns, out, indent=4)
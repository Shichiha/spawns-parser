import os,sys,json
with open(os.path.join(os.path.dirname(__file__), "../../data/spawns2.json"), "r") as inp:
    parsed_spawns = {}
    for scene in json.load(inp):
        for spawn in scene["spawns"]: parsed_spawns.setdefault(spawn["monster_id"], []).append([spawn["position"]["x"], spawn["position"]["y"], spawn["position"]["z"]])
    with open(os.path.join(os.path.dirname(__file__), "../../parsed/parsedSpawns.json"), "w") as out:
        json.dump(parsed_spawns, out, indent=4)
import json
import os
import sys

with open(spawn_file, "r") as f:
        spawn_data = json.load(f)
def main():
    spawn_file = os.path.join(os.path.dirname(__file__), "../../data/Spawns.json")
    parsed_spawn_file = os.path.join(os.path.dirname(__file__), "../../parsed/parsedSpawns.json")
    parsed_spawns = {}
    parsed_spawn_count = 0
    for scene in spawn_data:
        for spawn in scene["spawns"]:
            if spawn["monsterId"] not in parsed_spawns:
                parsed_spawns[spawn["monsterId"]] = []
            parsed_spawns[spawn["monsterId"]].append([spawn["pos"]["x"], spawn["pos"]["y"], spawn["pos"]["z"]])
            parsed_spawn_count += 1

    with open(parsed_spawn_file, "w") as f:
        json.dump(parsed_spawns, f, indent=4)

if __name__ == "__main__":
    main()
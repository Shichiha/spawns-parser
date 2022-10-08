const fs = require("fs");
const path = require("path");
const parsedSpawns = {};
for (const scene of JSON.parse(fs.readFileSync(path.join(__dirname, "../../data/Spawns.json"), "utf8"))) {
    for (const spawn of scene.spawns) {
        if (!parsedSpawns[spawn.monsterId])
            parsedSpawns[spawn.monsterId] = [];
        parsedSpawns[spawn.monsterId].push([spawn.pos.x, spawn.pos.y, spawn.pos.z]);
    }
}
fs.writeFileSync(path.join(__dirname, "../../parsed/parsedSpawns.json"), JSON.stringify(parsedSpawns, null, 4));
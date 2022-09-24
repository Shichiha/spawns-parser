import fs from 'fs'
import path from "path";

const spawnFile = path.join(__dirname, "../data/Spawns.json");
const parsedSpawnFile = path.join(__dirname, "../parsed/parsedSpawns.json");

const spawnData = JSON.parse(fs.readFileSync(spawnFile, "utf8"));

console.log(spawnData.length);
const parsedSpawns: { [key: string]: number[][] } = {};
let parsedSpawnCount = 0;
for (const scene of spawnData) {
    for (const spawn of scene.spawns) {
        if (!parsedSpawns[spawn.monsterId])
            parsedSpawns[spawn.monsterId] = [];
        parsedSpawns[spawn.monsterId].push([spawn.pos.x, spawn.pos.y, spawn.pos.z]);
        parsedSpawnCount++;
    }
}

fs.writeFileSync(parsedSpawnFile, JSON.stringify(parsedSpawns, null, 4));

console.log(parsedSpawnCount);
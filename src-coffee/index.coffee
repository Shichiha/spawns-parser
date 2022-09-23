fs = require 'fs'
path = require "path"

spawnFile = path.join __dirname, "../data/Spawns.json"
parsedSpawnFile = path.join __dirname, "../parsed/parsedSpawns.json"

spawnData = JSON.parse fs.readFileSync spawnFile, "utf8"

console.log spawnData.length
pSpawns = {}
pSpawnCount = 0
for scene in spawnData
    for spawn in scene.spawns
        unless pSpawns[spawn.monsterId]
            pSpawns[spawn.monsterId] = []
        pSpawns[spawn.monsterId].push [spawn.pos.x, spawn.pos.y, spawn.pos.z]
        pSpawnCount++

fs.writeFileSync parsedSpawnFile, JSON.stringify pSpawns, null, 4

console.log 
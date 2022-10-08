fs = require 'fs'
path = require 'path'
spawns = JSON.parse fs.readFileSync path.join(__dirname, '../../data/spawns.json')
parsedSpawns = {}
for scene in spawns
  for spawn in scene.spawns
    parsedSpawns[spawn.monsterId] = parsedSpawns[spawn.monsterId] or []
    parsedSpawns[spawn.monsterId].push [spawn.pos.x, spawn.pos.y, spawn.pos.z]
fs.writeFileSync path.join(__dirname, '../../parsed/parsedSpawns.json'), JSON.stringify(parsedSpawns, null, 4)
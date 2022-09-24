"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const spawnFile = path_1.default.join(__dirname, "../data/Spawns.json");
const parsedSpawnFile = path_1.default.join(__dirname, "../parsed/parsedSpawns.json");
const spawnData = JSON.parse(fs_1.default.readFileSync(spawnFile, "utf8"));
console.log(spawnData.length);
const parsedSpawns = {};
let parsedSpawnCount = 0;
for (const scene of spawnData) {
    for (const spawn of scene.spawns) {
        if (!parsedSpawns[spawn.monsterId])
            parsedSpawns[spawn.monsterId] = [];
        parsedSpawns[spawn.monsterId].push([spawn.pos.x, spawn.pos.y, spawn.pos.z]);
        parsedSpawnCount++;
    }
}
fs_1.default.writeFileSync(parsedSpawnFile, JSON.stringify(parsedSpawns, null, 4));
console.log(parsedSpawnCount);

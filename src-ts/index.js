"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const spawnFile = path_1.default.join(__dirname, "../data/Spawns.json");
const parsedSpawnFile = path_1.default.join(__dirname, "../parsed/parsedSpawns.json");
function parseSpawn(d) {
    return {
        monster_id: d.monsterId,
        config_id: d.configId,
        level: d.level,
        pose_id: d.poseId,
        pos: d.pos,
        rot: d.rot
    };
}
function parseScene(d) {
    return {
        scene_id: d.sceneId,
        group_id: d.groupId,
        block_id: d.blockId,
        pos: d.pos,
        spawns: d.spawns.map((spawn) => parseSpawn(spawn))
    };
}
function main() {
    const spawnData = JSON.parse(fs_1.default.readFileSync(spawnFile, "utf8"));
    console.log(spawnData.length);
    const scenes = spawnData.map((scene) => parseScene(scene));
    let parsedSpawnCount = 0;
    const parsedSpawns = {};
    for (const scene of scenes) {
        for (const spawn of scene.spawns) {
            if (!parsedSpawns[spawn.monster_id]) {
                parsedSpawns[spawn.monster_id] = [];
            }
            parsedSpawns[spawn.monster_id].push([spawn.pos.x, spawn.pos.y, spawn.pos.z]);
            parsedSpawnCount++;
        }
    }
    fs_1.default.writeFileSync(parsedSpawnFile, JSON.stringify(parsedSpawns));
}
main();

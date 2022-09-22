import fs from "fs";
import path from "path";

interface Vec3 {
    x: number;
    y: number;
    z: number;
}

interface Spawn {
    monster_id: number;
    config_id: number;
    level: number;
    pose_id: number;
    pos: Vec3;
    rot: Vec3;
}

interface Scene {
    scene_id: number;
    group_id: number;
    block_id: number;
    pos: Vec3;
    spawns: Spawn[];
}

const spawnFile = path.join(__dirname, "../data/Spawns.json");
const parsedSpawnFile = path.join(__dirname, "../parsed/parsedSpawns.json");

function parseSpawn(d: any): Spawn {
    return {
        monster_id: d.monsterId,
        config_id: d.configId,
        level: d.level,
        pose_id: d.poseId,
        pos: d.pos,
        rot: d.rot
    };
}

function parseScene(d: any): Scene {
    return {
        scene_id: d.sceneId,
        group_id: d.groupId,
        block_id: d.blockId,
        pos: d.pos,
        spawns: d.spawns.map((spawn: any) => parseSpawn(spawn))
    };
}

function main() {
    const spawnData = JSON.parse(fs.readFileSync(spawnFile, "utf8"));
    console.log(spawnData.length)
    const scenes: Scene[] = spawnData.map((scene: any) => parseScene(scene));
    let parsedSpawnCount = 0;
    const parsedSpawns: { [key: number]: number[][] } = {};
    for (const scene of scenes) {
        for (const spawn of scene.spawns) {
            if (!parsedSpawns[spawn.monster_id]) {
                parsedSpawns[spawn.monster_id] = [];
            }
            parsedSpawns[spawn.monster_id].push([spawn.pos.x, spawn.pos.y, spawn.pos.z]);
            parsedSpawnCount++;
        }
    }
    fs.writeFileSync(parsedSpawnFile, JSON.stringify(parsedSpawns));
}

main();

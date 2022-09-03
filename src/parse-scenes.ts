import * as fs from 'fs'

interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface Spawn {
    monsterId: number;
    configId: number;
    level: number;
    poseId: number;
    pos: Vector3;
    rot: Vector3;
}

interface Scene {
    sceneId: number;
    groupId: number;
    blockId: number;
    pos: Vector3;
    spawns: Spawn[];
}

function Vector3(d: any): Vector3 {
    return {
        x: d.x,
        y: d.y,
        z: d.z
    };
}

function parseSpawn(d: any): Spawn {
    return {
        monsterId: d.monsterId,
        configId: d.configId,
        level: d.level,
        poseId: d.poseId,
        pos: Vector3(d.pos),
        rot: Vector3(d.rot)
    };
}

function parseScene(d: any): Scene {
    return {
        sceneId: d.sceneId,
        groupId: d.groupId,
        blockId: d.blockId,
        pos: Vector3(d.pos),
        spawns: d.spawns.map(parseSpawn)
    };
}

const data = fs.readFileSync('./data/Spawns.json');
const d = JSON.parse(data.toString());
let scenes: Scene[] = d.map(parseScene);

interface ParsedScene {
    [SceneId: number]: number[];
}

interface ParsedSpawn {
    [MonsterId: number]: number[][]
}

let parsedScenes: ParsedScene = {

};

let parsedSpawns: ParsedSpawn = {};

scenes.forEach(scene => {
    if (!parsedScenes[scene.sceneId])
        parsedScenes[scene.sceneId] = [];
    parsedScenes[scene.sceneId].push(scene.sceneId);
    scene.spawns.forEach(spawn => {
        if (!parsedSpawns[spawn.monsterId])
            parsedSpawns[spawn.monsterId] = [];
        parsedSpawns[spawn.monsterId].push([spawn.pos.x, spawn.pos.y, spawn.pos.z]);
    });
});

fs.writeFileSync('./parsed/parsedScenes.json', JSON.stringify(parsedScenes));
fs.writeFileSync('./parsed/parsedSpawns.json', JSON.stringify(parsedSpawns));
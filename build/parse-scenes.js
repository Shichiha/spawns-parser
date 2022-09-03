"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
function Vector3(d) {
    return {
        x: d.x,
        y: d.y,
        z: d.z
    };
}
function parseSpawn(d) {
    return {
        monsterId: d.monsterId,
        configId: d.configId,
        level: d.level,
        poseId: d.poseId,
        pos: Vector3(d.pos),
        rot: Vector3(d.rot)
    };
}
function parseScene(d) {
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
let scenes = d.map(parseScene);
let parsedScenes = {};
let parsedSpawns = {};
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

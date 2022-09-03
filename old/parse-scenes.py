import json
import os
from typing import NamedTuple, List, Dict, Any, Tuple

class Vector3(NamedTuple[float, float, float]):
    x: float
    y: float
    z: float


class Spawn(NamedTuple[int, int, int, int, Vector3, Vector3]):
    spawnId: int
    configId: int
    level: int
    poseId: int
    pos: Vector3
    rot: Vector3


class Scene(NamedTuple[int, int, int, Vector3, List[Spawn]]):
    sceneId: int
    groupId: int
    blockId: int
    pos: Vector3
    spawns: List[Spawn]


def parse_vector3(d: Dict[str, Any]) -> Tuple[float, float, float]:
    return d['x'], d['y'], d['z']



def parse_spawn(d: Dict[str, Any]) -> Tuple[int, int, int, int, Tuple[float, float, float], Tuple[float, float, float]]:
    return d['monsterId'], d['configId'], d['level'], d['poseId'], parse_vector3(d['pos']), parse_vector3(d['rot'])


def parse_scene(d: Dict[str, Any]) -> Scene:
    return d['sceneId'], d['groupId'], d['blockId'], parse_vector3(d['pos']), [parse_spawn(s) for s in d['spawns']]


with open('data/Spawns.json') as data:
    d = json.load(data)
scenes: List[Scene] = [Scene(*parse_scene(s)) for s in d]

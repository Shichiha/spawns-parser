use std::fs::File;
use std::io::prelude::*;
use std::io::BufReader;
use std::collections::HashMap;
use serde_json::{Value, Error};
fn parse_vector3(d: &Value) -> Vec<f64> {
    let mut v: Vec<f64> = Vec::new();
    v.push(d["x"].as_f64().unwrap());
    v.push(d["y"].as_f64().unwrap());
    v.push(d["z"].as_f64().unwrap());
    v
}

fn parse_spawn(d: &Value) -> Spawn {
    Spawn {
        monster_id: d["monsterId"].as_i64().unwrap(),
        config_id: d["configId"].as_i64().unwrap(),
        level: d["level"].as_i64().unwrap(),
        pose_id: d["poseId"].as_i64().unwrap(),
        pos: parse_vector3(&d["pos"]),
        rot: parse_vector3(&d["rot"]),
    }
}

fn parse_scene(d: &Value) -> Scene {
    Scene {
        scene_id: d["sceneId"].as_i64().unwrap(),
        group_id: d["groupId"].as_i64().unwrap(),
        block_id: d["blockId"].as_i64().unwrap(),
        pos: parse_vector3(&d["pos"]),
        spawns: d["spawns"].as_array().unwrap().iter().map(|spawn| parse_spawn(spawn)).collect(),
    }
}

fn main() -> Result<(), Error> {
    let file = File::open("../data/Spawns.json")?;
    let reader = BufReader::new(file);
    let json: Value = serde_json::from_reader(reader)?;
    let mut scenes: Vec<Scene> = Vec::new();
    for scene in json.as_array().unwrap() {
        scenes.push(parse_scene(scene));
    }
    let mut parsed_spawns: HashMap<String, Vec<Vec<f64>>> = HashMap::new();
    for scene in scenes {
        for spawn in scene.spawns {
            if !parsed_spawns.contains_key(&spawn.monster_id.to_string()) {
                parsed_spawns.insert(spawn.monster_id.to_string(), Vec::new());
                parsed_spawns.get_mut(&spawn.monster_id.to_string()).unwrap().push(spawn.pos);
            } else {
                parsed_spawns.get_mut(&spawn.monster_id.to_string()).unwrap().push(spawn.pos);
            }
        }
    }
    let mut file = File::create("../parsed/parsedSpawns.json")?;
    file.write(serde_json::to_string(&parsed_spawns).unwrap().as_bytes())?;
    Ok(())
}
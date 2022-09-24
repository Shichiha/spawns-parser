pub mod structs;

use indicatif::{ProgressBar, ProgressStyle};
use serde_json::{Error, Value};
use std::collections::HashMap;
use std::fs::File;
use std::io::prelude::*;
use std::io::BufReader;
use structs::{Scene, Spawn, Vec3};

fn parse_vector3(d: &Value) -> Vec3 {
    Vec3 {
        x: d["x"].as_f64().unwrap(),
        y: d["y"].as_f64().unwrap(),
        z: d["z"].as_f64().unwrap(),
    }
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
        spawns: d["spawns"]
            .as_array()
            .unwrap()
            .iter()
            .map(|spawn| parse_spawn(spawn))
            .collect(),
    }
}

fn main() -> Result<(), Error> {
    let pb = ProgressBar::new(1000);
    pb.set_style(
        ProgressStyle::default_bar()
        .template("[{elapsed_precise}] {bar:40.cyan/blue} {pos:>7}/{len:7} {msg}")
        .unwrap(),
    );
    
    let file = File::open("../data/Spawns.json")
    .expect("Couldn't find file 'data/Spawns.json'. is your directory configured properly?");
    let reader = BufReader::new(file);
    let json: Value = serde_json::from_reader(reader)?;

    let mut spawn_count = 0;
    for scene in json.as_array().unwrap() {
        spawn_count += scene["spawns"].as_array().unwrap().len();
    }

    

    let mut scenes: Vec<Scene> = Vec::new();
    pb.set_message("Parsing scenes");
    for scene in json.as_array().unwrap() {
        scenes.push(parse_scene(scene));
    }
    let mut parsed_spawn_count = 0;

    let mut parsed_spawns: HashMap<i64, Vec<Vec3>> = HashMap::new();
    pb.set_message("Parsing spawns");
    for scene in scenes {
        for spawn in scene.spawns {
            if !parsed_spawns.contains_key(&spawn.monster_id) {
                parsed_spawns.insert(spawn.monster_id, Vec::new());
            }
            parsed_spawns.get_mut(&spawn.monster_id).unwrap().push(spawn.pos);
            parsed_spawn_count += 1;
        }
    }

    if spawn_count != parsed_spawn_count {
        panic!(
            "Spawn count mismatch! Original: {}, Parsed: {}",
            spawn_count, parsed_spawn_count
        );
    }

    pb.set_message("Writing to file");
    let mut file = File::create("../parsed/parsedSpawns.json").expect("Couldn't create file");
    file.write(serde_json::to_string(&parsed_spawns).unwrap().as_bytes())
        .unwrap();

    pb.finish_with_message("Done");
    Ok(())
}

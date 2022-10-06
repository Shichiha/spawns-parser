use anyhow::{bail, Error};
use colored::Colorize;
use fs_extra::{dir::create_all, file::write_all};
use serde::{Deserialize as De, Serialize as Se};
use serde_json::{from_str, to_string_pretty};
use std::{collections::HashMap, fs::read_to_string, path::Path};

#[derive(De)]
struct Spawn {
    spawns: Vec<SpawnElement>,
}
#[derive(Se, De)]
struct Pos {
    x: f64,
    y: f64,
    z: f64,
}
#[derive(De)]
struct SpawnElement {
    #[serde(rename = "monsterId")]
    monster_id: i64,
    pos: Pos,
}

fn main() -> Result<(), Error> {
    let root = Path::new("../../");
    let ip = root.join("data/Spawns.json");
    println!("Reading JSON...");
    let json = from_str::<Vec<Spawn>>(read_to_string(&ip)?.as_str())?;
    let mut ps: HashMap<i64, Vec<Pos>> = HashMap::new();
    let mut sc = 0;
    let mut psc = 0;
    println!("{}", "Processing JSON...".yellow());
    for scene in json {
        sc += scene.spawns.len();
        for spawn in scene.spawns {
            if !ps.contains_key(&spawn.monster_id) {
                ps.insert(spawn.monster_id, Vec::new());
            }
            ps.get_mut(&spawn.monster_id).unwrap().push(spawn.pos);
            psc += 1;
        }
    }
    println!("{}", "Processed JSON".green());
    if sc != psc {
        bail!(
            "{} Original: {}, Parsed: {}",
            "Spawn count mismatch!".red(),
            sc.to_string().cyan(),
            psc.to_string().red()
        );
    }
    println!("{}", "Writing parsed JSON...".yellow());
    let pp = root.join("parsed");
    create_all(&pp, true)?;
    write_all(
        pp.join("parsedSpawns.json"),
        to_string_pretty(&ps)?.as_str(),
    )?;
    println!("{}", "Done!".green());
    Ok(())
}

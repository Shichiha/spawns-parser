use serde::Serialize;

#[derive(Serialize)]
pub struct Vec3 {
    pub x: f64,
    pub y: f64,
    pub z: f64
}

#[derive(Serialize)]
pub struct Spawn {
    pub monster_id: i64,
    pub config_id: i64,
    pub level: i64,
    pub pose_id: i64,
    pub pos: Vec3,
    pub rot: Vec3
}

#[derive(Serialize)]
pub struct Scene {
    pub scene_id: i64,
    pub group_id: i64,
    pub block_id: i64,
    pub pos: Vec3,
    pub spawns: Vec<Spawn>
}
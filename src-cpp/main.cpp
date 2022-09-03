
#include <iostream>
#include <fstream>
#include <iomanip>
#include <string>
#include "json.hpp"

using json = nlohmann::json;

class Spawn
{
public:
    int monsterId;
    int configId;
    int level;
    int poseId;
    std::vector<float> pos;
    std::vector<float> rot;
};

class Scene
{
public:
    int sceneId;
    int groupId;
    int blockId;
    std::vector<float> pos;
    std::vector<Spawn> spawns;
};

std::vector<float> parseVector3(json d)
{
    std::vector<float> v;
    v.push_back(d["x"]);
    v.push_back(d["y"]);
    v.push_back(d["z"]);
    return std::move(v);
}

Spawn parseSpawn(json d)
{
    Spawn s;
    s.monsterId = d["monsterId"];
    s.configId = d["configId"];
    s.level = d["level"];
    s.poseId = d["poseId"];
    s.pos = parseVector3(d["pos"]);
    s.rot = parseVector3(d["rot"]);
    return s;
}

Scene parseScene(json d)
{
    Scene s;
    s.sceneId = d["sceneId"];
    s.groupId = d["groupId"];
    s.blockId = d["blockId"];
    s.pos = parseVector3(d["pos"]);
    for (auto spawn : d["spawns"])
        s.spawns.push_back(parseSpawn(spawn));
    return s;
}

auto progressBar = [](int current, int total) {std::cout << "\r" << std::setprecision(2) << std::fixed << (float)current / total * 100 << "%" << std::flush;};

int main()
{
    std::cout << "Parsing Spawns.json..." << std::endl; 
    std::ifstream file("../data/Spawns.json");
    json d;
    file >> d;
    std::vector<Scene> scenes;
    int total = d.size();
    int current = 0;
    for (auto scene : d)
    {
        progressBar(current, total);
        scenes.push_back(parseScene(scene));
        current++;
    }
    std::cout << std::endl;
    std::map<std::string, std::vector<std::vector<float>>> parsedSpawns;
    std::cout << "Parsing scenes..." << std::endl;
    total = scenes.size();
    current = 0;
    for (auto &scene : scenes)
    {
        progressBar(current, total);
        for (auto &spawn : scene.spawns)
        {
            if (parsedSpawns.find(std::to_string(spawn.monsterId)) == parsedSpawns.end())
                parsedSpawns[std::to_string(spawn.monsterId)] = std::vector<std::vector<float>>();
            parsedSpawns[std::to_string(spawn.monsterId)].push_back(spawn.pos);
        }
        current++;
    }
    std::cout << std::endl;

    std::ofstream out("../parsed/parsedSpawns.json");
    std::cout << "Writing parsedSpawns.json..." << std::endl;
    out << std::setprecision(5) << json(parsedSpawns).dump();
    out.close();
    return 0;
}
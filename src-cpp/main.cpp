#include <fstream>
#include <iostream>
#include <string>
#include "json.hpp"

int main()
{
    std::ifstream spawn_file("../data/Spawns.json");
    nlohmann::json spawn_data;
    spawn_file >> spawn_data;

    std::cout << spawn_data.size() << std::endl;

    nlohmann::json parsed_spawns;
    int parsed_spawn_count = 0;
    for (auto& scene : spawn_data)
    {
        for (auto& spawn : scene["spawns"])
        {
            if (parsed_spawns.find(spawn["monsterId"]) == parsed_spawns.end())
            {
                parsed_spawns[spawn["monsterId"]] = nlohmann::json::array();
            }
            parsed_spawns[spawn["monsterId"]].push_back({ spawn["pos"]["x"], spawn["pos"]["y"], spawn["pos"]["z"] });
            parsed_spawn_count++;
        }
    }

    std::ofstream parsed_spawn_file("../parsed/parsedSpawns.json");
    parsed_spawn_file << parsed_spawns.dump(4);
}
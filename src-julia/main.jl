using JSON
spawn_file = joinpath(@__DIR__, "../data/Spawns.json")
parsed_spawn_file = joinpath(@__DIR__, "../parsed/parsedSpawns.json")
spawn_data = JSON.parsefile(spawn_file)
function parse()
    parsed_spawns = Dict{String, Array{Array{Float64, 1}, 1}}()
    parsed_spawn_count = 0
    for scene in spawn_data
        for spawn in scene["spawns"]
            monster_id = string(spawn["monsterId"])
            if !haskey(parsed_spawns, monster_id)
                parsed_spawns[monster_id] = []
            end
            push!(parsed_spawns[monster_id], [spawn["pos"]["x"], spawn["pos"]["y"], spawn["pos"]["z"]])
            parsed_spawn_count += 1
        end
    end

    open(parsed_spawn_file, "w") do f
        JSON.print(f, parsed_spawns, 2)
    end
end

function main()
    parse()
end

main()

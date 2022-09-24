using JSON

function main()
    spawn_file = joinpath(@__DIR__, "../data/Spawns.json")
    parsed_spawn_file = joinpath(@__DIR__, "../parsed/parsedSpawns.json")

    spawn_data = JSON.parsefile(spawn_file)

    parsed_spawns = Dict{String, Array{Array{Float64, 1}, 1}}()
    parsed_spawn_count = 0
    for scene in spawn_data
        for spawn in scene["spawns"]
            if !haskey(parsed_spawns, spawn["monsterId"])
                parsed_spawns[spawn["monsterId"]] = []
            end
            push!(parsed_spawns[spawn["monsterId"]], [spawn["pos"]["x"], spawn["pos"]["y"], spawn["pos"]["z"]])
            parsed_spawn_count += 1
        end
    end

    open(parsed_spawn_file, "w") do f
        JSON.print(f, parsed_spawns, 2)
    end
end

main()
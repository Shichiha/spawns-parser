DEPS = JSON Graphs

all:
	julia main.jl $(ARGS)

setup:
	julia -e 'import Pkg; $(foreach dep,$(DEPS),Pkg.add("$(dep)");)' 
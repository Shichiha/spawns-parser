CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -Werror -pedantic -O3
SRC = main.cpp
all:
	$(CXX) $(SRC) $(CXXFLAGS) -o main
launch:
	./main
setup:
	curl -L https://github.com/nlohmann/json/releases/download/v3.11.2/json.hpp -o json.hpp
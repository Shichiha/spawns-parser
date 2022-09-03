
CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -Werror -pedantic -O3

SRC = main.cpp
OBJ = $(SRC:.cpp=.o)

all: $(OBJ)
	$(CXX) $(CXXFLAGS) $(OBJ) -o main

clean:
	rm -f $(OBJ)

fclean: clean
	rm -f main

re: fclean all

.PHONY: all clean fclean re
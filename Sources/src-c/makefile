all: main.c
	gcc -o main main.c
launch:
	./main
setup:
	curl -L https://github.com/DaveGamble/cJSON/archive/refs/tags/v1.7.15.zip -o json.zip
	echo open zip, move 'cJSON.c' and 'cJSON.h' into 'src-c' (.) folder
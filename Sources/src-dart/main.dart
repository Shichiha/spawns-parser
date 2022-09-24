import 'dart:io';
import 'dart:convert';

void main() {
  var spawnFile = File('../../data/Spawns.json');
  var parsedSpawnFile = File('../../parsed/parsedSpawns.json');

  var spawnData = jsonDecode(spawnFile.readAsStringSync());

  print(spawnData.length);
  var parsedSpawns = [];
  var parsedSpawnCount = 0;
  for (var scene in spawnData) {
    for (var spawn in scene['spawns']) {
      parsedSpawns.add({
        'monsterId': spawn['monsterId'],
        'pos': [spawn['pos']['x'], spawn['pos']['y'], spawn['pos']['z']]
      });
      parsedSpawnCount++;
    }
  }

  parsedSpawnFile.writeAsStringSync(jsonEncode(parsedSpawns));

  print(parsedSpawnCount);
}
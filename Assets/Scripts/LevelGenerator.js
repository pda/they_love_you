#pragma strict
#pragma downcast

public var WallCube : GameObject;
public var Monster : GameObject;
public var Player : GameObject;
public var Goal : GameObject;

public var levels : GameObject[];

private var mapObjects : Array;

private var currentLevel : int;
private var totalLevels : int;

function Start () {
	mapObjects = new Array();
	currentLevel = 0;
	totalLevels = levels.Length;
	buildMap();
}

function Update () {
	if (Input.GetKeyDown("r")) restart();
	if (Input.GetKeyDown("n")) startNextLevel();
	if (Input.GetKeyDown("p")) startPreviousLevel();
}

function isWhite(c : Color) {
	return c.r >= 0.9 && c.g >= 0.9 && c.b >= 0.9;
}

function isRed(c : Color) {
	return c.r >= 0.9 && c.g <= 0.1 && c.b <= 0.1;
}

function isGreen(c: Color) {
	return c.r <= 0.1 && c.g >= 0.9 && c.b <= 0.1;
}

function isBlue(c: Color) {
	return c.r <= 0.1 && c.g <= 0.1 && c.b >= 0.9;
}

function buildMap() {
	var WIDTH = 16;
	var HEIGHT = 16;
	var SCALE = 32;

	var pixels : Array = currentMap().GetPixels();
	
	for (var y = 0; y < HEIGHT; y++) {
		for (var x = 0; x < WIDTH; x++) {
			var i = (y * WIDTH) + x;
			var position = Vector3(x * SCALE, 0, y * SCALE);
			var c : Color = pixels[i];
			if (isWhite(c)) {
				instantiatePrefab(WallCube, position);
			}
			if (isRed(c)) {
				instantiatePrefabScaled(Monster, position, levelParameters().monsterSize);
			}
			if (isGreen(c)) {
				instantiatePrefabScaled(Player, position, levelParameters().playerSize);
			}
			if (isBlue(c)) {
				instantiatePrefab(Goal, position);
			}    
		}
	}	
}

function currentMap() {
	return levels[currentLevel].
		GetComponent(LevelController).
		map;
}

function levelParameters() {
	return levels[currentLevel].
		GetComponent(Constants);
}

function destroyMap() {
	while (mapObjects.length) {
		Destroy(mapObjects.pop());
	}
}

function restart() {
	destroyMap();
	buildMap();
}

function startNextLevel() {
	currentLevel = (currentLevel + 1) % totalLevels;
	restart();
}

function startPreviousLevel() {
	currentLevel = (currentLevel == 0 ? totalLevels : currentLevel) - 1;
	restart();
}

function instantiatePrefab(prefab : GameObject, position : Vector3) {
	var instance : GameObject = Instantiate(prefab, position, Quaternion.identity);
	instance.transform.localPosition.y = instance.transform.localScale.y * 0.5;
	mapObjects.Add(instance);
	return instance;
}

function instantiatePrefabScaled(prefab : GameObject, position : Vector3, size: float) {
	var instance : GameObject = instantiatePrefab(prefab, position);
	instance.transform.localScale = Vector3(size, size, size);
	return instance;
}
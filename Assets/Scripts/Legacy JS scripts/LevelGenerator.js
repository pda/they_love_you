//#pragma strict
//#pragma downcast

public var WallCube : GameObject;
public var Monster : GameObject;
public var Player : GameObject;
public var Goal : GameObject;

public var levels : GameObject[];

private var levelObjects : Array;

private var currentLevel : int;
private var totalLevels : int;

function Start () {
	levelObjects = new Array();
	currentLevel = 0;
	totalLevels = levels.Length;
	BuildMap();
}

function Update () {
	if (Input.GetKeyDown("r")) Restart();
	if (Input.GetKeyDown("n")) StartNextLevel();
	if (Input.GetKeyDown("p")) StartPreviousLevel();
}

function IsWhite (c : Color) {
	return c.r >= 0.9 && c.g >= 0.9 && c.b >= 0.9;
}

function IsRed (c : Color) {
	return c.r >= 0.9 && c.g <= 0.1 && c.b <= 0.1;
}

function IsGreen (c : Color) {
	return c.r <= 0.1 && c.g >= 0.9 && c.b <= 0.1;
}

function IsBlue (c : Color) {
	return c.r <= 0.1 && c.g <= 0.1 && c.b >= 0.9;
}

function IsPurple (c : Color) {
	return c.r >= 0.9 && c.g <= 0.1 && c.b >= 0.9;
}

function BuildMap () {
	var WIDTH = 16;
	var HEIGHT = 16;
	var SCALE = 32;
	var HALF_SCALE = SCALE / 2;

	var pixels : Array = CurrentMap().GetPixels();
	
	for (var y = 0; y < HEIGHT; y++) {
		for (var x = 0; x < WIDTH; x++) {
			var i = (y * WIDTH) + x;
			var position = Vector3(x * SCALE + HALF_SCALE, 0, y * SCALE + HALF_SCALE);
			var sPosition = Vector3(273, 0, 528);
			var c : Color = pixels[i];
			if (IsWhite(c)) {
				InstantiatePrefab(WallCube, position);
			}
			if (IsRed(c)) {
				InstantiatePrefabScaled(Monster, position, LevelParameters().monsterSize);
			}
			if (IsGreen(c)) {
				InstantiatePrefabScaled(Player, position, LevelParameters().playerSize);
			}
			if (IsBlue(c)) {
				InstantiatePrefab(Goal, position);
			}
			if (IsPurple(c)) {
				// Secret hackery to unlock special levels
				InstantiatePrefab(Goal, sPosition);
			}
		}
	}	
}

function CurrentMap () {
	return levels[currentLevel].GetComponent(LevelController).map;
}

function LevelParameters () {
	return levels[currentLevel].GetComponent(Constants);
}

function Restart () {
	DestroyLevelObjects();
	BuildMap();
}

function StartNextLevel () {
	currentLevel = (currentLevel + 1) % totalLevels;
	Restart();
}

function StartPreviousLevel () {
	currentLevel = (currentLevel == 0 ? totalLevels : currentLevel) - 1;
	Restart();
}

function InstantiatePrefab (prefab : GameObject, position : Vector3) {
	var instance : GameObject = Instantiate(prefab, position, Quaternion.identity);
	instance.transform.localPosition.y = instance.transform.localScale.y * 0.5;
	AddLevelObject(instance);
	return instance;
}

function InstantiatePrefabScaled (prefab : GameObject, position : Vector3, size : float) {
	var instance : GameObject = InstantiatePrefab(prefab, position);
	instance.transform.localScale = Vector3(size, size, size);
	return instance;
}

// Add a GameObject to be destroyed along with the level.
function AddLevelObject (object : GameObject) {
	levelObjects.Add(object);
}

// Destroy level objects, clearing the scene ready for a new level.
function DestroyLevelObjects () {
	while (levelObjects.length) {
		Destroy(levelObjects.Pop());
	}
}
#pragma strict

public var reachedAnimation : GameObject;

private var levelGenerator : LevelGenerator;
private var loadNextLevelAt : float;

function Start () {
	levelGenerator = GameObject.Find("LevelGenerator").GetComponent(LevelGenerator);
	loadNextLevelAt = 0.0;
}

function Update () {
	if (loadNextLevelAt && Time.time >= loadNextLevelAt)
		levelGenerator.startNextLevel();
}

function reached () {
	loadNextLevelAt = Time.time + levelGenerator.levelParameters().nextLevelDelay;
	Instantiate(reachedAnimation, transform.localPosition, Quaternion.identity);	
	setPlayerVictorious();
	setMonstersBeaten();
}

function setPlayerVictorious () {
	GameObject.FindGameObjectWithTag("Player").
		GetComponent(PlayerController).
		setVictorious();
}

function setMonstersBeaten() {
	for (var m : GameObject in GameObject.FindGameObjectsWithTag("Monster")) {
		m.GetComponent(MonsterController).setBeaten(true);
	}
}

function OnTriggerEnter (other : Collider) {
	if (other.CompareTag("Player")) reached();
}
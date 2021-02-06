#pragma strict

private var levelGenerator : LevelGenerator;
private var loadNextLevelAt : float;

function Start () {
	levelGenerator = GameObject.Find("LevelGenerator").GetComponent(LevelGenerator);
	loadNextLevelAt = 0.0;
}

function Update () {
	if (loadNextLevelAt && Time.time >= loadNextLevelAt)
		levelGenerator.StartNextLevel();
}

function OnTriggerEnter (other : Collider) {
	if (other.CompareTag("Player")) Reached();
}

function Reached () {
	loadNextLevelAt = Time.time + levelGenerator.LevelParameters().nextLevelDelay;
	transform.animation.Play();
	transform.audio.Play();
	SetPlayerVictorious();
	SetMonstersBeaten();
}

function SetPlayerVictorious () {
	GameObject.FindGameObjectWithTag("Player").
		GetComponent(PlayerController).
		SetVictorious();
}

function SetMonstersBeaten () {
	for (var m : GameObject in GameObject.FindGameObjectsWithTag("Monster")) {
		m.GetComponent(MonsterController).SetBeaten(true);
	}
}
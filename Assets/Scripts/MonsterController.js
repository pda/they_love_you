#pragma strict

public var stunnedMaterial : Material;
private var originalMaterial : Material;

private var target : GameObject;

private var levelGenerator : LevelGenerator;

private var stunnedSince : float;
private var isBeaten : boolean = false;
private var stunTime : float;

function Start () {
	levelGenerator = GameObject.Find("LevelGenerator").GetComponent(LevelGenerator);
	originalMaterial = transform.renderer.material;
	stunTime = levelGenerator.LevelParameters().monsterStunTime;
	target = GameObject.Find("Player(Clone)");
}

function Update () {
	if (!target) {
		target = GameObject.Find("Player(Clone)");
	}
	
	if (target) {	
		LookAtTarget();
		if (ShouldChase()) MoveTowardsTarget();
	}
	
	CheckStunnedTime();	
}

function ShouldChase () {
	return !stunnedSince && !isBeaten;
}

function Stun () {
	stunnedSince = Time.time;
	transform.renderer.material = stunnedMaterial;
}

function UnStun () {
	stunnedSince = 0;
	transform.renderer.material = originalMaterial;
}

function CheckStunnedTime () {
	if (Time.time - stunnedSince >= stunTime)
		UnStun();
}

function SetBeaten (beaten : boolean) {
	isBeaten = beaten;
}

function LookAtTarget () {
	transform.LookAt(target.transform);
}

function MoveTowardsTarget () {
	var direction : Vector3 = (target.transform.localPosition - transform.localPosition).normalized;
	GetComponent(CharacterController).Move(
		direction * levelGenerator.LevelParameters().monsterSpeed * Time.deltaTime
	);
	transform.localPosition.y = transform.localScale.y / 2;
}
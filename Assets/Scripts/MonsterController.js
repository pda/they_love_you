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
	stunTime = levelGenerator.levelParameters().monsterStunTime;
	target = GameObject.Find("Player(Clone)");
}

function Update () {
	if (!target) {
		target = GameObject.Find("Player(Clone)");
	}
	
	if (target) {	
		lookAtTarget();
		if (shouldChase()) moveTowardsTarget();
	}
	
	checkStunnedTime();	
}

function shouldChase () {
	return !stunnedSince && !isBeaten;
}

function stun () {
	stunnedSince = Time.time;
	transform.renderer.material = stunnedMaterial;
}

function unStun () {
	stunnedSince = 0;
	transform.renderer.material = originalMaterial;
}

function checkStunnedTime() {
	if (Time.time - stunnedSince >= stunTime)
		unStun();
}

function setBeaten (beaten : boolean) {
	isBeaten = beaten;
}

function lookAtTarget () {
	transform.LookAt(target.transform);
}

function moveTowardsTarget () {
	var controller : CharacterController = GetComponent(CharacterController);
	
	var direction : Vector3 = (target.transform.localPosition - transform.localPosition).normalized;

	controller.Move(
		direction * levelGenerator.levelParameters().monsterSpeed * Time.deltaTime
	);
	transform.localPosition.y = transform.localScale.y / 2;
}
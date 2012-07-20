#pragma strict

private var target : GameObject;

private var levelGenerator : LevelGenerator;

private var stunnedSince : float;
private var isBeaten : boolean = false;

function Start () {
	levelGenerator = GameObject.Find("LevelGenerator").GetComponent(LevelGenerator);
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

function Stun () {
	stunnedSince = Time.time;
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

function checkStunnedTime() {
	if (Time.time - stunnedSince >= levelGenerator.levelParameters().monsterStunTime)
		stunnedSince = 0.0;
}
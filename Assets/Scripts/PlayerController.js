#pragma strict

public var Explosion : GameObject;
public var bombCount : int;

private var cameraHeightDelta : float;
private var playerOriginalY : float;
private var isVictorious : boolean;

private var levelGenerator : LevelGenerator;
private var goalTransform : Transform;


function Start () {
	levelGenerator = GameObject.Find("LevelGenerator").GetComponent(LevelGenerator);
	bombCount = levelGenerator.levelParameters().bombCount;
	playerOriginalY = transform.localPosition.y;
	cameraHeightDelta =
		Camera.main.transform.localPosition.y -
		transform.localPosition.y;
}

function Update () {
	lookAtGoal();
	handleKeyboardInput();
	forceYPosition();
}

function setVictorious () {
	isVictorious = true;
}

function lookAtGoal () {
	withGoalTransform(function (gt : Transform) {
		transform.LookAt(gt);
	});
}

function handleKeyboardInput () {
	if (isVictorious) return;

	var h : float = Input.GetAxis("Horizontal");
	var v : float = Input.GetAxis("Vertical");	
	var controller : CharacterController = GetComponent(CharacterController);
	controller.Move(Vector3(h, 0, v) * levelGenerator.levelParameters().playerSpeed * Time.deltaTime);

	if (Input.GetKeyDown("space") && bombCount) {
		dropBomb();
	}
}

function dropBomb() {
	bombCount--;
	var bomb : GameObject = Instantiate(
		Explosion,
		transform.localPosition,
		Quaternion.identity
	);
	levelGenerator.addLevelObject(bomb);
}

function forceYPosition() {
	transform.localPosition.y = playerOriginalY;
}

function withGoalTransform(callback : Function) {
	// load and cache goalTransform
	if (!goalTransform) {
		var goalGameObject = GameObject.FindGameObjectWithTag("Finish");
		if (goalGameObject) goalTransform = goalGameObject.transform;
	}
	if (goalTransform) callback(goalTransform);
}
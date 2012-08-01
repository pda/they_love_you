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
	bombCount = levelGenerator.LevelParameters().bombCount;
	playerOriginalY = transform.localPosition.y;
	cameraHeightDelta =
		Camera.main.transform.localPosition.y -
		transform.localPosition.y;
}

function Update () {
	LookAtGoal();
	HandleKeyboardInput();
	ForceYPosition();
}

function SetVictorious () {
	isVictorious = true;
}

function LookAtGoal () {
	WithGoalTransform(function (gt : Transform) {
		transform.LookAt(gt);
	});
}

function HandleKeyboardInput () {
	if (isVictorious) return;

	var h : float = Input.GetAxis("Horizontal");
	var v : float = Input.GetAxis("Vertical");	
	var controller : CharacterController = GetComponent(CharacterController);
	controller.Move(Vector3(h, 0, v) * levelGenerator.LevelParameters().playerSpeed * Time.deltaTime);

	if (Input.GetKeyDown("space") && bombCount) {
		DropBomb();
	}
}

function DropBomb () {
	bombCount--;
	var bomb : GameObject = Instantiate(
		Explosion,
		transform.localPosition,
		Quaternion.identity
	);
	levelGenerator.AddLevelObject(bomb);
}

function ForceYPosition () {
	transform.localPosition.y = playerOriginalY;
}

function WithGoalTransform (callback : Function) {
	// load and cache goalTransform
	if (!goalTransform) {
		var goalGameObject = GameObject.FindGameObjectWithTag("Finish");
		if (goalGameObject) goalTransform = goalGameObject.transform;
	}
	if (goalTransform) callback(goalTransform);
}
#pragma strict

public var Explosion : GameObject;

private var cameraHeightDelta : float;
private var playerOriginalY : float;
private var bombCount : int;
private var isVictorious : boolean;

private var levelGenerator : LevelGenerator;


function Start () {
	levelGenerator = GameObject.Find("LevelGenerator").GetComponent(LevelGenerator);
	bombCount = levelGenerator.levelParameters().bombCount;
	playerOriginalY = transform.localPosition.y;
	cameraHeightDelta =
		Camera.main.transform.localPosition.y -
		transform.localPosition.y;
}

function Update () {
	lookAtFinish();
	handleKeyboardInput();
	forceYPosition();
}

function setVictorious () {
	isVictorious = true;
}

function lookAtFinish () {
	transform.LookAt(GameObject.FindGameObjectWithTag("Finish").transform);
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
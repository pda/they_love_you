#pragma strict

private var playerController : PlayerController;
private var baseText : String;

function Start () {
	baseText = transform.guiText.text;
}

function Update () {
	transform.guiText.text = baseText + " (" + playerBombCount() + ")";
}

function playerBombCount() {
	return findPlayerController().bombCount;
}

function findPlayerController() {
	if (playerController) {
		return playerController;
	} else {
		playerController = GameObject.Find("Player(Clone)").GetComponent(PlayerController);
		return playerController;
	}
}
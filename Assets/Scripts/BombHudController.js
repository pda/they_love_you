#pragma strict

private var playerController : PlayerController;
private var baseText : String;
private var textMesh : TextMesh;

function Start () {
	textMesh = transform.GetComponent(TextMesh);
	baseText = textMesh.text;
}

function Update () {
	textMesh.text = baseText + " (" + playerBombCount() + ")";
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
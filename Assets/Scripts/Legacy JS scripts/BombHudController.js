#pragma strict

private var playerController : PlayerController;
private var baseText : String;
private var textMesh : TextMesh;

function Start () {
	textMesh = transform.GetComponent(TextMesh);
	baseText = textMesh.text;
}

function Update () {
	textMesh.text = baseText + " (" + PlayerBombCount() + ")";
}

function PlayerBombCount () {
	return FindPlayerController().bombCount;
}

function FindPlayerController () {
	if (playerController) {
		return playerController;
	} else {
		playerController = GameObject.Find("Player(Clone)").GetComponent(PlayerController);
		return playerController;
	}
}
#pragma strict

public var audioListenerContainer : GameObject;

private var muted : boolean;
private var listener : AudioListener;
private var textMesh : TextMesh;

function Start () {
	listener = audioListenerContainer.GetComponent(AudioListener);	
	textMesh = transform.GetComponent(TextMesh);
}

function Update () {
	if (Input.GetKeyDown("m")) ToggleMute();
}

function ToggleMute () {
	SetMuted(!muted);
}

function SetMuted (mute) {
	if (mute) {
		listener.pause = true;
		muted = true;
		SetText("M: Unmute");
	} else {
		listener.pause = false;
		muted = false;
		SetText("M: Mute");
	}
}

function SetText (text : String) {
	textMesh.text = text;
}
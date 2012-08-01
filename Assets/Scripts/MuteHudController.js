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
	if (Input.GetKeyDown("m")) toggleMute();
}

function toggleMute() {
	setMuted(!muted);
}

function setMuted(mute) {
	if (mute) {
		listener.pause = true;
		muted = true;
		setText("M: Unmute");
	} else {
		listener.pause = false;
		muted = false;
		setText("M: Mute");
	}
}

function setText(text : String) {
	textMesh.text = text;
}
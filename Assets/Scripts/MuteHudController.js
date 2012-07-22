#pragma strict

public var audioListenerContainer : GameObject;

private var muted : boolean;
private var listener : AudioListener;

function Start () {
	listener = audioListenerContainer.GetComponent(AudioListener);	
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
	transform.guiText.text = text;
}
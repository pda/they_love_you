#pragma strict

private var expireTime : float;

function Start () {
	expireTime = Time.time + 1.0;
}

function Update () {
	checkExpiry();
}

function OnTriggerEnter (other : Collider) {
	if (other.CompareTag("Monster")) {
		other.GetComponent(MonsterController).Stun();
	}
}

function checkExpiry() {
	if (Time.time >= expireTime) {
		Destroy(this.gameObject);
	}
}
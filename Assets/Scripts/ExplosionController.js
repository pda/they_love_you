#pragma strict

private var expireTime : float;

function Start () {
	expireTime = Time.time + 0.8;
}

function Update () {
	CheckExpiry();
}

function OnTriggerEnter (other : Collider) {
	if (other.CompareTag("Monster")) {
		other.GetComponent(MonsterController).Stun();
	}
}

function CheckExpiry () {
	if (Time.time >= expireTime) {
		Destroy(this.gameObject);
	}
}
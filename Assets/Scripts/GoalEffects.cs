using UnityEngine;
using System.Collections;

public class GoalEffects : MonoBehaviour {
	
	public GameObject child_target;
	public GameObject child_target2;
	
	public float spin_speed;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		
		child_target.transform.Rotate(spin_speed * Time.deltaTime,spin_speed * Time.deltaTime,spin_speed * Time.deltaTime, Space.World);
		child_target2.transform.Rotate(spin_speed * Time.deltaTime,spin_speed * Time.deltaTime,spin_speed * Time.deltaTime, Space.World);
	}
}

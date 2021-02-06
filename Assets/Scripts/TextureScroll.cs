using UnityEngine;
using System.Collections;

public class TextureScroll : MonoBehaviour {
	
	public float scrollSpeed;
	public Vector2 tex_scale;
	//public int alpha;
	
	
	// Use this for initialization
	void Start () {
		
		//scrollSpeed = 0.05f;
		this.GetComponent<Renderer>().material.SetTextureScale("_MainTex", tex_scale);
	}
	
	// Update is called once per frame
	void Update () {
		
		float offset = Time.time * scrollSpeed;
		
        GetComponent<Renderer>().material.SetTextureOffset("_MainTex", new Vector2(offset, 0));
	
	}
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ExplosionController : MonoBehaviour
{
    private float expireTime;

    void Start()
    {
        expireTime = (Time.time + 0.8f);
    }

    void Update()
    {
        CheckExpiry();
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Monster"))
        {
            other.GetComponent<MonsterController>().Stun();
        }
    }

    void CheckExpiry()
    {
        if (Time.time >= expireTime)
        {
            Destroy(this.gameObject);
        }
    }
}

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MonsterController : MonoBehaviour
{

    public Material stunnedMaterial;
    private Material originalMaterial;

    private GameObject target;

    private LevelGenerator levelGenerator;

    private float stunnedSince;
    private bool isStunned;
    private bool isBeaten = false;
    private float stunTime;

    void Start()
        {
            levelGenerator = GameObject.Find("levelGenerator").GetComponent<LevelGenerator>();
            originalMaterial = transform.GetComponent<Renderer>().material;
            stunTime = levelGenerator.LevelParameters().monsterStunTime;
            target = GameObject.Find("Player(Clone)");
        }

    void Update()
        {
            if (!target)
            {
                target = GameObject.Find("Player(Clone)");
            }

            if (target)
            {
                LookAtTarget();
                if (ShouldChase()) MoveTowardsTarget();
            }

            CheckStunnedTime();
        }

        public bool ShouldChase()
        {
            return !isStunned && !isBeaten;
        }

        public void Stun()
        {
            isStunned = true;
            stunnedSince = Time.time;
            transform.GetComponent<Renderer>().material = stunnedMaterial;
        }

        public void UnStun()
        {
            stunnedSince = 0;
            isStunned = false;
            transform.GetComponent<Renderer>().material = originalMaterial;
        }

        public void CheckStunnedTime()
        {
            if (Time.time - stunnedSince >= stunTime)
                UnStun();
        }

        public void SetBeaten(bool beaten)
        {
            isBeaten = beaten;
        }

        public void LookAtTarget()
        {
            transform.LookAt(target.transform);
        }

        public void MoveTowardsTarget()
        {
            Vector3 direction = (target.transform.localPosition - transform.localPosition).normalized;
            GetComponent<CharacterController>().Move(
                direction * levelGenerator.LevelParameters().monsterSpeed * Time.deltaTime
            );
            transform.localPosition.Set(transform.localScale.x, transform.localScale.y / 2, transform.localScale.z);
        }

}

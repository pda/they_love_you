using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GoalController : MonoBehaviour
{
    private LevelGenerator levelGenerator;
    private float loadNextLevelAt;
    private bool goalReached = false;

    void Start()
    {
        levelGenerator = GameObject.Find("LevelGenerator").GetComponent<LevelGenerator>();
        loadNextLevelAt = 0.0f;
    }

    void Update()
    {
        if (goalReached && Time.time >= loadNextLevelAt)
        {
            levelGenerator.StartNextLevel();
        }
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player")) Reached();
    }

    private void Reached()
    {
        goalReached = true;
        loadNextLevelAt = Time.time + levelGenerator.LevelParameters().nextLevelDelay;
        transform.GetComponent<Animation>().Play();
        transform.GetComponent<AudioSource>().Play();
        SetPlayerVictorious();
        SetMonstersBeaten();
    }

    private void SetPlayerVictorious()
    {
        GameObject.FindGameObjectWithTag("Player").
            GetComponent<PlayerController>().
            SetVictorious();
    }

    private void SetMonstersBeaten()
    {
        foreach (GameObject m in GameObject.FindGameObjectsWithTag("Monster"))
        {
            m.GetComponent<MonsterController>().SetBeaten(true);
        }
    }
}

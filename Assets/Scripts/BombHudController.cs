using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BombHudController : MonoBehaviour
{
    private PlayerController playerController;
    private string baseText;
    private TextMesh textMesh;

    void Start()
    {
        textMesh = transform.GetComponent<TextMesh>();
        baseText = textMesh.text;
    }

    void Update()
    {
        textMesh.text = baseText + " (" + PlayerBombCount() + ")";
    }

    int PlayerBombCount()
    {
        return FindPlayerController().bombCount;
    }

    PlayerController FindPlayerController()
    {
        if (playerController)
        {
            return playerController;
        }
        else
        {
            playerController = GameObject.Find("Player(Clone)").GetComponent<PlayerController>();
            return playerController;
        }
    }
}

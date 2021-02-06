using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public GameObject Explosion;
    public int bombCount;

    private float cameraHeightDelta;
    private float playerOriginalY;
    private bool isVictorious;

    private LevelGenerator levelGenerator;
    private Transform goalTransform;


    void Start()
    {
        levelGenerator = GameObject.Find("LevelGenerator").GetComponent<LevelGenerator>();
        bombCount =  (int)levelGenerator.LevelParameters().bombCount;
        playerOriginalY = transform.localPosition.y;
        cameraHeightDelta = 
            Camera.main.transform.localPosition.y 
            - transform.localPosition.y;

        if (!goalTransform)
        {
            goalTransform = GameObject.FindGameObjectWithTag("Finish").transform;
        }
    }

    void Update()
    {
        LookAtGoal();
        HandleKeyboardInput();
        ForceYPosition();
    }

    public void SetVictorious()
    {
        isVictorious = true;
    }

    private void LookAtGoal()
    {
        transform.LookAt(goalTransform);
    }

    private void HandleKeyboardInput()
    {
        if (isVictorious) return;

        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        CharacterController controller = GetComponent<CharacterController>();
        controller.Move(new Vector3(h, 0, v) 
            * levelGenerator.LevelParameters().playerSpeed 
            * Time.deltaTime);

        if (Input.GetKeyDown("space") && bombCount>0)
        {
            DropBomb();
        }
    }

    void DropBomb()
    {
        bombCount--;
        GameObject bomb = Instantiate(
            Explosion,
            transform.localPosition,
            Quaternion.identity
        );
        levelGenerator.AddLevelObject(bomb);
    }

    void ForceYPosition()
    {
        transform.localPosition.Set(
            transform.localPosition.x, 
            playerOriginalY, 
            transform.localPosition.z);
    }

}

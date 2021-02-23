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
    private Vector3 moveVector;
    private CharacterController controller = null;


    void Start()
    {
        levelGenerator = GameObject.Find("LevelGenerator").GetComponent<LevelGenerator>();
        bombCount =  (int)levelGenerator.LevelParameters().bombCount;
        playerOriginalY = transform.localPosition.y;
        controller = GetComponent<CharacterController>();
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
        HandleKeyboardInput();
    }

    private void FixedUpdate()
    {
        LookAtGoal();
        controller.Move(moveVector * Time.deltaTime);
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
        moveVector = new Vector3(h, 0, v)
            * levelGenerator.LevelParameters().playerSpeed;

        if (Input.GetKeyDown("space") && bombCount>0)
        {
            DropBomb();
        }
    }

    void DropBomb()
    {
        bombCount--;
        GameObject bomb = Instantiate(Explosion, transform.position, Quaternion.identity);
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

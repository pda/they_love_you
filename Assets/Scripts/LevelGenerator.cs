using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LevelGenerator : MonoBehaviour
{
    // Start is called before the first frame update
    public GameObject Wallcube;
    public GameObject Monster;
    public GameObject Player;
    public GameObject Goal;

    public GameObject[] levels;
    private List<GameObject> levelObjects;

    private int currentLevel;
    private int totalLevels; 



    void Start()
    {
        levelObjects = new List<GameObject>();
        currentLevel = 0;
        totalLevels = levels.Length;
        BuildMap();   
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.R)) Restart();
        if (Input.GetKeyDown(KeyCode.N)) StartNextLevel();
        if (Input.GetKeyDown(KeyCode.P)) StartPreviousLevel();

    }

    void BuildMap()
    {
        var WIDTH = 16;
        var HEIGHT = 16;
        var SCALE = 32;
        var HALF_SCALE = SCALE / 2;

    }


    //function CurrentMap()
    //{
    //    return levels[currentLevel].GetComponent(LevelController).map;
    //}

    //function LevelParameters()
    //{
    //    return levels[currentLevel].GetComponent(Constants);
    //}


    private void Restart()
    {
        DestroyLevelObjects();
        BuildMap();
    }

    private void StartNextLevel()
    {
        currentLevel = (currentLevel + 1) % totalLevels;
        Restart();

    }

    private void StartPreviousLevel()
    {
        currentLevel = (currentLevel == 0 ? totalLevels : currentLevel) - 1;
        Restart();
    }




    GameObject InstantiatePrefab (GameObject prefab, Vector3 pos)
    {
        var instance = Instantiate(prefab, pos, new Quaternion());
        //  instance.transform.localPosition.y = instance.transform.localScale.y * 0.5;
        AddLevelObject(instance);
        return instance;

    }

    GameObject InstantiatePrefabScaled(GameObject prefab, Vector3 pos, float size)
    {
        GameObject instance = InstantiatePrefab(prefab, pos);
        instance.transform.localScale =  new Vector3(size, size, size);
        return instance;
    }


    void AddLevelObject(GameObject objects)
    {
        levelObjects.Add(objects);

    }

    private void DestroyLevelObjects()
    {

        levelObjects.Clear();
    }
}

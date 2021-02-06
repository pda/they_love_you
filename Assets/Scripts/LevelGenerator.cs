using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LevelGenerator : MonoBehaviour
{
    // Start is called before the first frame update
    public GameObject WallCube;
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

    bool IsWhite(Color c)
    {
        return c.r >= 0.9 && c.g >= 0.9 && c.b >= 0.9;

    }

    bool IsRed(Color c)
    {
        return c.r >= 0.9 && c.g <= 0.1 && c.b <= 0.1;

    }

    bool IsGreen(Color c)
    {
        return c.r <= 0.1 && c.g >= 0.9 && c.b <= 0.1;

    }

    bool IsBlue(Color c)
    {
        return c.r <= 0.1 && c.g <= 0.1 && c.b >= 0.9;

    }

    bool IsPurple(Color c)
    {
        return c.r >= 0.9 && c.g <= 0.1 && c.b >= 0.9;

    }

    void BuildMap()
    {
        var WIDTH = 16;
        var HEIGHT = 16;
        var SCALE = 32;
        var HALF_SCALE = SCALE / 2;

        Color[] pixels = CurrentMap().GetPixels();

        for (int y = 0; y < HEIGHT; y++)
        {
            for(int x = 0; x < WIDTH; x++)
            {
                var i = (y * WIDTH) + x;
                var position = new Vector3(x * SCALE + HALF_SCALE, 0, y * SCALE + HALF_SCALE);
                var sPosition = new Vector3(273, 0, 528);
                Color c = pixels[i];

                if (IsWhite(c))
                {
                    InstantiatePrefab(WallCube, position);
                }
                if (IsRed(c))
                {
                    InstantiatePrefabScaled(Monster, position, LevelParameters().monsterSize);
                }
                if (IsGreen(c))
                {
                    InstantiatePrefabScaled(Player, position, LevelParameters().playerSize);
                }
                if (IsBlue(c))
                {
                    InstantiatePrefab(Goal, position);
                }
                if (IsPurple(c))
                {
                    // Secret hack to unlock special levels
                    InstantiatePrefab(Goal, sPosition);
                }
            }

        }

    }



    public Texture2D CurrentMap()
    {

        return levels[currentLevel].GetComponent<LevelData>().map;
    }

    public Constants LevelParameters()
    {
        return levels[currentLevel].GetComponent<Constants>();

    }


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
        var instance = Instantiate(prefab, pos, new Quaternion(), gameObject.transform);
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
        foreach( GameObject obj in levelObjects)
        {
            Destroy(obj);
        }
        levelObjects.Clear();
    }
}

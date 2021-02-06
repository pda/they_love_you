using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MuteHudController : MonoBehaviour
{

    public GameObject audioListenerContainer;

    private bool muted;
    private AudioListener listener;
    private TextMesh textMesh;
    // Start is called before the first frame update
    void Start()
    {
        listener = audioListenerContainer.GetComponent<AudioListener>();
        textMesh = transform.GetComponent<TextMesh>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.M)) ToggleMute();
    }

    void ToggleMute()
    {
        SetMuted(!muted);

    }

    void SetMuted (bool mute)
    {
        if (mute)
        {
            listener.enabled = false;
            muted = true;
            SetText("M: Unmute");
        }
        else
        {

            listener.enabled = true;
            muted = false;
            SetText("M: Mute");
        }

    }

    void SetText (string text)
    {
        textMesh.text = text;

    }
}

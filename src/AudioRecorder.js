import React, {useState} from "react";
import AudioAnalyser from "react-audio-analyser";



function AudioRecorder (){

 const [gsr, setGsr] = useState('');
  const [gcs, setGcs] = useState('');
  const [sphinx, setSphinx] = useState('');
  const [whisper, setWhisper] = useState('');
  const [state, setState] = useState("");
  const { status, audioSrc, audioType } = state;

  const controlAudio = (status)=> {
    setState({
      status: status,
      audioType: "audio/wav"
    });
  }

  const changeScheme = (e) =>{
    setState({
      audioType: e.target.value
    });
  }



    
    
    const audioProps = {
      audioType,
      // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
      status,
      audioSrc,
      timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
      startCallback: e => {
        console.log("succ start", e);
      },
      pauseCallback: e => {
        console.log("succ pause", e);
      },
      stopCallback: e => {
        setState({
          audioSrc: window.URL.createObjectURL(e)
        });

        (async function () {
          console.log(e);
          const formData = new FormData();
          formData.append('audio-file', e);
          console.log(formData);
          console.log(JSON.stringify(e));
          fetch(`/api/TranslateAudio`, {
            method: 'POST',
            body: formData, // you can just skip this if all you want is to test the API
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            setGsr(data.gsr);
            setGcs(data.gcs);
            setSphinx( data.gcs);
            setWhisper(data.whisper);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        })();
        console.log("succ stop", e);
        
      },
      onRecordCallback: e => {
        console.log("recording", e);
      },
      errorCallback: err => {
        console.log("error", err);
      }
    };

    return (
      <div>
        <AudioAnalyser {...audioProps}>
          <div className="btn-box">
            <button
              className="btn"
              onClick={() => controlAudio("recording")}
            >
              Start
            </button>
            {/* <button className="btn" onClick={() => this.controlAudio("paused")}>
              Pause
            </button> */}
            <button
              className="btn"
              onClick={() => controlAudio("inactive")}
            >
              Stop
            </button>
            {/* <button className="btn" onClick={() => console.log(AudioAnalyser)}>
              Log
            </button> */}
          </div>
        </AudioAnalyser>
        <label>
            {gsr}
        </label>
        <br></br>
        <label>
            {gcs}
        </label>
         <br></br>
        <label>
            {whisper}
        </label>
         <br></br>
        <label>
            {sphinx}
        </label>
        <p>choose output type</p>
        <select
          name=""
          id=""
          onChange={e => changeScheme(e)}
          value={audioType}
        >
          <option value="audio/webm">audio/webm（default）</option>
          <option value="audio/wav">audio/wav</option>
          <option value="audio/mp3">audio/mp3</option>
        </select>
      </div>
    );
}

export default AudioRecorder;

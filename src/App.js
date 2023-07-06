import React from "react";
import AudioRecorder from "./AudioRecorder.js";

import "./index.css";


function App() {
  return (
    <div className="App">
      <h2>Speach Recognization</h2>
      <AudioRecorder />
    </div>
  );
}


export default App;




//   const [data, setData] = useState('');
//   const [last, setLast] = useState('');
//   const [recorder, setRecorder] = useState(null);

//   let gumStream = null;
//   let audioContext = null;

//   const startRecording = () => {
//         let constraints = {
//             audio: true,
//             video: false
//         }

//         audioContext = new window.AudioContext();
//         console.log("sample rate: " + audioContext.sampleRate);

//         navigator.mediaDevices
//             .getUserMedia(constraints)
//             .then(function (stream) {
//                 console.log("initializing Recorder.js ...");

//                 gumStream = stream;

//                 let input = audioContext.createMediaStreamSource(stream);
//                 let recorderr = new window.Recorder(input, {
//                     numChannels: 1
//                 });
//                 console.log("recordeingansdjx" );
//                 console.log(recorderr);
//                 setRecorder(recorderr);

//                 recorder.record();
//                 console.log("Recording started");
//             }).catch(function (err) {
//                 //enable the record button if getUserMedia() fails
//         });

//     }

//     const stopRecording = () => {
//         console.log("stopButton clicked");
//         console.log(recorder);
//         recorder.stop(); //stop microphone access
//         gumStream.getAudioTracks()[0].stop();

//         recorder.exportWAV(onStop);
//     }

//     const onStop = (blob) => {
//         console.log("uploading...");

//         let data = new FormData();

//         data.append('text', "this is the transcription of the audio file");
//         data.append('wavfile', blob, "recording.wav");

//         const config = {
//             headers: {'content-type': 'multipart/form-data'}
//         }
//         axios.post('/api/TranslateAudio', data, config);
//     }


//   const addAudioElement = (blob) => {
//     const url = URL.createObjectURL(blob);
//     const audio = document.createElement("audio");
//     audio.src = url;
//     audio.controls = true;
//     if(last=='')
//     {
//       document.body.appendChild(audio);
//     }
//     else
//     {
//       const linebreak = document.createElement("br");
//       document.body.insertBefore(linebreak, last);
//       document.body.insertBefore(audio, linebreak);
//     }
//     setLast(audio);
//     (async function () {
//       console.log(blob);
//       const formData = new FormData();
//       formData.append('audio-file', blob);
//       console.log(formData);
//       console.log(JSON.stringify(blob));
//       fetch(`/api/TranslateAudio`, {
//         method: 'POST',
//         body: formData, // you can just skip this if all you want is to test the API
//       })
//       .then(response => response.json())
//       .then(data => {
//         console.log('Success:', data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });

//     })();
//   };




//   return <div>
//             <div>
//               <div>
//                 <button onClick={startRecording} type="button">Start</button>
//                 <button onClick={stopRecording} type="button">Stop</button>
//               </div>
//             </div>
//             <div>
//               {data}
//             </div>
//     </div>;

//   // const value = 'World';
//   // return <div>Hello {value}</div>;
// }
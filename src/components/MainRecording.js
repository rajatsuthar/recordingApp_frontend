import React, { useState } from 'react';
import './MainRecording.css';

const Recording = () => {
  const [recording, setRecording] = useState(false);
  const [confirmRecording, setConfirmRecording] = useState(false);
  const [Audio, setAudio] = useState(false);
  // const [alldata,setAll] =useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedPart, setrecordedPart] = useState([]);
  const [allStrm, setallStrm] = useState(null);

  const startRecording = async () => {
    try {
      const screen = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const webcam = await navigator.mediaDevices.getUserMedia({ video: true });

      const audioStream = Audio ? await navigator.mediaDevices.getUserMedia({ audio: true }) : null;

      const newallStrm = new MediaStream([
        ...screen.getTracks(),
        ...webcam.getTracks(),
        ...(audioStream ? audioStream.getTracks() : []),
      ]);
      setallStrm(newallStrm);

      const recorder = new MediaRecorder(newallStrm);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setrecordedPart([...recordedPart, event.data]);
          // console.log("in if condition",recordedPart);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedPart, { type: 'video/webm' });
        const recordedDataUrl = URL.createObjectURL(blob);
        localStorage.setItem('recordedDataUrl', recordedDataUrl);
      };

      recorder.start();
      setRecording(true);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setallStrm(null);
      setrecordedPart([]); 
    }

    if (allStrm) {
      const webcam = allStrm.getTracks().find((track) => track.kind === 'video');
      if (webcam) {
        webcam.stop();
      }
    }
  };

  return (
    <>
    
    <div className="recording-container">
    <div className='logout-div'><a href='/'>Logout</a></div>
     
      <div className="inner-div">
        <img className="img" src="./back.png" alt="Back" />
        {!confirmRecording ? (
          <button className="confirm-button" onClick={() => setConfirmRecording(true)}>
            Confirm Recording
          </button>
        ) : (
          <>
            <button className="audio-button" onClick={() => setAudio((prev) => !prev)}>
              {Audio ? 'Stop Audio Recording' : 'Start Audio Recording'}
            </button>
            <button
              className={`record-button ${recording ? 'recording' : ''}`}
              onClick={recording ? stopRecording : startRecording}
            >
              {recording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </>
        )}
      </div>
    </div>
    </>
  );
};

export default Recording;

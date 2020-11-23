//import logo from './logo.svg';
import '../App.css';
import React from "react";
import {pauseAudio, playAudio, stopAudio} from "./playsnippet";

function App() {

    const audioSource= 'test1.wav';
    function handlePlay() {
        playAudio(audioSource);
    }

  return (
    <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={pauseAudio}>Pause</button>
        <button onClick={stopAudio}>Stop</button>
    </div>
  );
}

export default App;

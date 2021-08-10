import React, { useState, useEffect } from "react";
import MediaPlayer from "../api/MediaPlayer";
import Header from '../components/Header';
import AudioPlayer from "../components/AudioPlayer";
import AudioPlayerSongs from "../components/AudioPlayerSongs";
import "../assets/styles/normalize.css";
import "../assets/styles/App.css";

const App = () => {
  const player = document.getElementById('audio');
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <AudioPlayerSongs />
        <AudioPlayer instance={new MediaPlayer({el: player})}/>
      </div>
    </React.Fragment>
  )
};

export default App;

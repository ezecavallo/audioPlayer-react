import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import AudioPlayer from "../components/AudioPlayer";
import "../assets/styles/normalize.css";
import "../assets/styles/App.css";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <AudioPlayer />
      </div>
    </React.Fragment>
  )
};

export default App;

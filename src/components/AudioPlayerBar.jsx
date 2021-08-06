import React from 'react';
import '../assets/styles/components/AudioPlayerBar.css';

const AudioPlayerBar = () => {
  return (
    <div className="mediaplayer__bar">
      <p className="mediaplayer__bar--left">1:37</p>
      <p className="mediaplayer__bar--duration">3:04</p>
    </div>
  );
};

export default AudioPlayerBar;
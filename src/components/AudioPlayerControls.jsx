import React from 'react';
import '../assets/styles/components/AudioPlayerControls.css';

class AudioPlayerControls extends React.Component {
  render() {
    return(
      <div className="mediaplayer__controls">
        <button className="mediaplayer__controls--shuffle"><span></span></button>
        <button className="mediaplayer__controls--back"><span></span></button>
        <button className="mediaplayer__controls--play"><span></span></button>
        <button className="mediaplayer__controls--next"><span></span></button>
        <button className="mediaplayer__controls--repeat"><span></span></button>
        <div className="mediaplayer__controls--volume">
          <button></button>
          <input type="range" className="volume-slider" id="volume-slider" max="100" value="100" />
        </div>
      </div>
    );
  };
};

export default AudioPlayerControls;
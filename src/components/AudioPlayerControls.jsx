import React from 'react';
import '../assets/styles/components/AudioPlayerControls.css';

class AudioPlayerControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      volume: 30,
    }
    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay() {
    try {
      this.setState((state) => {
        return {
          play: !state.play
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  playNextTrack() {

  }

  playPreviousTrack() {

  }

  toggleShuffle() {

  }

  toggleRepeat() {

  }

  render() {
    return(
      <div className="mediaplayer__controls">
        <button onClick={this.toggleShuffle} className="mediaplayer__controls--shuffle"><span></span></button>
        <button onClick={this.playPreviousTrack} className="mediaplayer__controls--back"><span></span></button>
        <button onClick={this.togglePlay} className="mediaplayer__controls--play" id={this.state.play ? "" : "pause"}><span></span></button>
        <button onClick={this.playNextTrack} className="mediaplayer__controls--next"><span></span></button>
        <button onClick={this.toggleRepeat} className="mediaplayer__controls--repeat"><span></span></button>
        <div className="mediaplayer__controls--volume">
          <button></button>
          <input type="range" className="volume-slider" id="volume-slider" max="100" value={this.state.volume} />
        </div>
      </div>
    );
  };
};

export default AudioPlayerControls;
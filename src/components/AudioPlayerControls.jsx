import React from 'react';
import '../assets/styles/components/AudioPlayerControls.css';

class AudioPlayerControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      volume: 30,
    }
    this.player = this.props.instance;
    this.togglePlay = this.togglePlay.bind(this);
  }

  componentDidMount() {
    this.setState({
      volume: this.getVolume()
    });
    this.handlerEndedSong()
  }

  getVolume() {
    return 3;
  }

  setVolume() {

  }

  togglePlay() {
    if (!this.state.play) {
      this.player.play()
    } else {
      this.player.pause()
    }
    try {
      this.setState((state) => {
        return {
          play: !state.play
        }
      });
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

  handlerEndedSong() {
    this.player.media.addEventListener("ended", (event) => {
      this.setState({
        play: false
      })
    });
  }

  render() {
    return(
      <div className="mediaplayer__controls">
        <button onClick={this.toggleShuffle} className="mediaplayer__controls--shuffle"><span></span></button>
        <button onClick={this.playPreviousTrack} className="mediaplayer__controls--back"><span></span></button>
        <button onClick={this.togglePlay} className="mediaplayer__controls--play" id={this.state.play ? "pause" : ""}><span></span></button>
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
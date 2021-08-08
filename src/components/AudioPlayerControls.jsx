import React from 'react';
import '../assets/styles/components/AudioPlayerControls.css';

class AudioPlayerControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      volume: 30,
      prevVolume: 30,
    }
    this.player = this.props.instance;
    this.togglePlay = this.togglePlay.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
  }

  componentDidMount() {
    this.player.media.volume = this.state.volume / 100;
    this.handlerEndedSong()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.volume != prevState.volume) {
      this.player.media.volume = this.state.volume / 100;
    }
  }

  setVolume(e) {
    this.setState({
      volume: e.target.value,
      prevVolume: e.target.value
    })
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

  toggleMute() {
    this.setState(state => {
      if (state.volume != 0) {
        return {
          volume: 0
        }
      }
      return {
        volume: state.prevVolume
      }
    })
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
          <button onClick={this.toggleMute}></button>
          <input onChange={this.setVolume} type="range" className="volume-slider" id="volume-slider" max="100" value={this.state.volume} />
        </div>
      </div>
    );
  };
};

export default AudioPlayerControls;
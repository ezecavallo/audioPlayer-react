import React from 'react';
import '../assets/styles/components/AudioPlayerControls.css';

class AudioPlayerControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spotifyPlayer: this.props.player.spotifyPlayer,
      volume: 30,
      prevVolume: 30
    }
    this.togglePlay = this.togglePlay.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.playNextTrack = this.playNextTrack.bind(this);
    this.playPreviousTrack = this.playPreviousTrack.bind(this);

    // AbortController
    this.controller = new window.AbortController()
    this.signal = this.controller.signal
  }

  componentDidMount() {
    this.getVolume();
    // local
    // this.player.media.volume = this.state.volume / 100;
    // this.handlerEndedSong()

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.volume != prevState.volume) {
      this.state.spotifyPlayer.setVolume(this.state.volume / 100).then(() => {
        console.log('Volume updated!');
      });
    }
  }

  // Local
  setVolume(e) {
    this.setState({
      volume: e.target.value,
      prevVolume: e.target.value
    })
  }

  getVolume() {
    this.state.spotifyPlayer.getVolume().then(volume => {
      let volume_percentage = volume * 100;
      console.log(`The volume of the player is ${volume_percentage}%`);
    });
  }

  togglePlay() {
    if (!this.props.player.playing) {
      this.state.spotifyPlayer.togglePlay().then(() => {
        console.log('Toggled playback!');
      });
    } else {
      this.state.spotifyPlayer.togglePlay().then(() => {
        console.log('Toggled playback!');
      });
    }
    try {
      this.setState((state) => {
        return {
          playing: !state.playing
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  playNextTrack() {
    this.state.spotifyPlayer.nextTrack().then(() => {
      console.log('Skipped to next track!');
    });
  }

  playPreviousTrack() {
    this.state.spotifyPlayer.previousTrack().then(() => {
      console.log('Set to previous track!');
    });
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
        playing: false
      })
    });
  }

  render() {
    return(
      <div className="mediaplayer__controls">
        <button onClick={this.toggleShuffle} className="mediaplayer__controls--shuffle"><span></span></button>
        <button onClick={this.playPreviousTrack} className="mediaplayer__controls--back"><span></span></button>
        <button onClick={this.togglePlay} className="mediaplayer__controls--play" id={this.props.player.playing ? "pause" : ""}><span></span></button>
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
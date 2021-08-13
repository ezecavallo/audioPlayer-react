import React from 'react';
import '../assets/styles/components/AudioPlayerBar.css';

class AudioPlayerBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timePlayed: '0:00',
      positionMs: 0,
      formattedDuration: '0:00',
      rawDuration: this.props.items.currentTrack.duration_ms,
      widthBar: 0,
    }
    this.player = this.props.instance;
    this.seek = this.seek.bind(this);
  }

  componentDidMount() {
    this.updateDuration()
    this.updateTimePlayed();
    this.updateProgressBar();
    // this.eventListenerEndedSong()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.items.currentTrack.duration_ms !== this.state.rawDuration) {
      this.updateDuration()
    }
    if (this.props.player.position !== this.state.positionMs) {
      this.updateTimePlayed()
      this.updateProgressBar();
    }
  }

  seek(event) {
    const duration = this.state.duration.rawDuration;
    const timeSelected = event.clientX / event.target.offsetWidth;
    this.player.media.currentTime = timeSelected * duration;
  }

  updateProgressBar() {
    const percentedPlayed = this.calculatePercentPlayed(this.state.rawDuration);
    console.log(percentedPlayed);
    if (percentedPlayed < 100) {
      this.setState({
        widthBar: percentedPlayed,
      });
    }
  }

  calculatePercentPlayed(duration) {
    const percentedPlayed = (this.props.player.position * 100) / duration;
    return percentedPlayed;
  }

  updateTimePlayed() {
    const timePlayed = this.calculateTime(this.props.player.position);
    this.setState({
      timePlayed: timePlayed || '00:00',
      positionMs: this.props.player.position
    });
  }

  updateDuration() {
    const formattedDuration = this.calculateTime(this.props.items.currentTrack.duration_ms);
    this.setState({
        formattedDuration: formattedDuration,
        rawDuration: this.props.items.currentTrack.duration_ms
    })
  }

  calculateTime(time) {
    if (!time) {
      return undefined;
    }
    const toSec = time / 1000;
    const currentMinute = Math.floor(toSec / 60);
    const currentSeconds = Math.round(toSec % 60);
    const formattedSeconds = currentSeconds.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    });
    const currentValue = `${currentMinute}:${formattedSeconds}`;
    return currentValue;
  }

  eventListenerEndedSong() {
    this.player.media.onended = () => {
      this.setState({
        widthBar: 0,
        timePlayed: '0:00',
      });
    };
  };

  render() {
    return (
      <div onClick={this.seek} className="mediaplayer__bar">
        <div style={{"width": this.state.widthBar + '%'}} className="mediaplayer__bar--progress"></div>
        <p className="mediaplayer__bar--left">{ this.state.timePlayed }</p>
        <p className="mediaplayer__bar--duration">{ this.state.formattedDuration }</p>
      </div>
    );
  };
};

export default AudioPlayerBar;
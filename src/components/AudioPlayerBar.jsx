import React from 'react';
import '../assets/styles/components/AudioPlayerBar.css';

class AudioPlayerBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timePlayed: '0:00',
      duration: {
        formattedDuration: '0:00',
        rawDuration: '000',
      },
      widthBar: 0,
    }
    this.player = this.props.instance;
    this.seek = this.seek.bind(this);
  }

  componentDidMount() {
    this.updateDuration()
    this.player.media.addEventListener("timeupdate", () => {
      this.updateTimePlayed();
      this.updateProgressBar();
      this.eventListenerEndedSong()
    });
  }

  seek(event) {
    const duration = this.state.duration.rawDuration;
    const timeSelected = event.clientX / event.target.offsetWidth;
    this.player.media.currentTime = timeSelected * duration;
  }

  updateProgressBar() {
    const percentedPlayed = this.player.calculatePercentPlayed(this.state.duration.rawDuration);
    if (percentedPlayed < 100) {
      this.setState({
        widthBar: percentedPlayed,
      });
    }
  }

  updateTimePlayed() {
    const timePlayed = this.player.calculateTime(this.player.media.currentTime);
    this.setState({
      timePlayed: timePlayed
    });
  }

  updateDuration() {
    this.player.getDuration(this.player.media).then((duration) => {
      const formattedDuration = this.player.calculateTime(duration);
      this.setState({
        duration: {
          formattedDuration: formattedDuration,
          rawDuration: duration
        },
      })
    });
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
        <p className="mediaplayer__bar--duration">{ this.state.duration.formattedDuration }</p>
      </div>
    );
  };
};

export default AudioPlayerBar;
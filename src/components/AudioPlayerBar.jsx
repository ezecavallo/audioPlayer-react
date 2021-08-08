import React from 'react';
import '../assets/styles/components/AudioPlayerBar.css';

class AudioPlayerBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false,
      ended: false,
      timePlayed: '0:00',
      duration: '0:00',
      widthBar: 0,
    }
    this.player = this.props.instance;
  }

  componentDidMount() {
    this.updateDuration()
    this.player.media.currentTime = 245;
    this.player.media.addEventListener("timeupdate", (event) => {
      this.updateTimePlayed();
      this.updateProgressBar();
      this.eventListenerEndedSong()
    });
  }

  updateProgressBar() {
    this.player.getDuration(this.player.media).then((duration) => {
      const percentedPlayed = this.player.calculatePercentPlayed(duration);
      if (percentedPlayed < 100) {
        this.setState({
          widthBar: percentedPlayed,
        });
      }
    });
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
        duration: formattedDuration,
      })
    });
  }

  eventListenerEndedSong() {
    this.player.media.onended = () => {
      this.setState({
        widthBar: 0,
        timePlayed: '0:00'
      });
    };
  };

  render() {
    return (
      <div className="mediaplayer__bar">
        <div style={{"width": this.state.widthBar + '%'}} className="mediaplayer__bar--progress"></div>
        <p className="mediaplayer__bar--left">{ this.state.timePlayed }</p>
        <p className="mediaplayer__bar--duration">{ this.state.duration }</p>
      </div>
    );
  };
};

export default AudioPlayerBar;
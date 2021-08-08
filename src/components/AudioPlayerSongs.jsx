import React from 'react';
import AudioPlayerCover from './AudioPlayerCover';
import '../assets/styles/components/AudioPlayerSongs.css';

class AudioPlayerSongs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTrack: '',
      previousTrack: '',
      nextTrack: '',
    }
  }

  componentDidMount() {
    this.getCurrentState()
  }

  getCurrentState() {
    try {
      this.setState({
        currentTrack: '',
        previousTrack: '',
        nextTrack: '',
      })
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="mediaplayer__songs">
        <AudioPlayerCover 
            title="I SEE IT COMING" 
            artist="NASAYA, MARO"
            cover="../assets/images/cover/albumcover.jpg"
            position="current"
        />
        <AudioPlayerCover 
          title="I SEE IT COMING" 
          artist="NASAYA, MARO"
          cover="../assets/images/cover/ab67616d00001e02b913288a30bced86972d2b3e.jpg"
          position="next"
        />
        <AudioPlayerCover 
          title="I SEE IT COMING" 
          artist="NASAYA, MARO"
          cover="../assets/images/cover/ab67616d00001e020180c5f180f4d69298a02543.jpg"
          position="back"
        />
      </div>
    );
  };
};

export default AudioPlayerSongs;
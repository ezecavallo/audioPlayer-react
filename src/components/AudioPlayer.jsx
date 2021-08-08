import React from 'react';
import AudioPlayerSongs from './AudioPlayerSongs';
import AudioPlayerControls from './AudioPlayerControls';
import AudioPlayerBar from './AudioPlayerBar';
import '../assets/styles/components/AudioPlayer.css';

class AudioPlayer extends React.Component {
  render () {
    return (
      <div className="mediaplayer">
        <AudioPlayerSongs />
        <AudioPlayerControls instance={this.props.instance} />
        <AudioPlayerBar instance={this.props.instance} />
      </div>
    );
  };
};

export default AudioPlayer;
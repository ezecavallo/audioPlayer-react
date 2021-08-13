import React from 'react';
import AudioPlayerSongs from './AudioPlayerSongs';
import AudioPlayerControls from './AudioPlayerControls';
import AudioPlayerBar from './AudioPlayerBar';
import '../assets/styles/components/AudioPlayer.css';

class AudioPlayer extends React.Component {
  render () {
    return (
      <div className="mediaplayer">
        <AudioPlayerControls 
          instance={this.props.instance}
          player={this.props.player}
          access_token={this.props.access_token}
        />
        <AudioPlayerBar 
          instance={this.props.instance}
          player={this.props.player}
          items={this.props.items}
          access_token={this.props.access_token}
        />
      </div>
    );
  };
};

export default AudioPlayer;
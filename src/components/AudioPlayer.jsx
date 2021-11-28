import React from 'react';
import AudioPlayerSongs from './AudioPlayerSongs';
import AudioPlayerControls from './AudioPlayerControls';
import AudioPlayerBar from './AudioPlayerBar';
import '../assets/styles/components/AudioPlayer.css';

const AudioPlayer = (props) => {
  return (
    <div className="mediaplayer">
      <AudioPlayerControls 
        player={props.player}
      />
      <AudioPlayerBar
        player={props.player}
        items={props.items}
      />
    </div>
  );
};

export default AudioPlayer;
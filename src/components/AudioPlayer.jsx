import React from 'react';
import AudioPlayerSongs from './AudioPlayerSongs';
import AudioPlayerControls from './AudioPlayerControls';
import AudioPlayerBar from './AudioPlayerBar';
import '../assets/styles/components/AudioPlayer.css';

const AudioPlayer = (props) => {
  return (
    <div className="mediaplayer">
      <AudioPlayerControls 
        instance={props.instance}
        player={props.player}
        access_token={props.access_token}
      />
      <AudioPlayerBar 
        instance={props.instance}
        player={props.player}
        items={props.items}
        access_token={props.access_token}
      />
    </div>
  );
};

export default AudioPlayer;
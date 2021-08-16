import React from 'react';
import AudioPlayerCover from './AudioPlayerCover';
import '../assets/styles/components/AudioPlayerSongs.css';

const AudioPlayerSongs = (props) => {
  const { currentTrack, nextTrack, previousTrack } = props.items
  return (
    <div className="mediaplayer__songs--container">
      <div className="mediaplayer__songs">
        <AudioPlayerCover 
            key={1}
            title={currentTrack?.name} 
            cover={currentTrack?.album.images[0].url}
            position="current"
        />
        <AudioPlayerCover 
            key={2}
            title={nextTrack?.name} 
            cover={nextTrack?.album.images[0].url}
            position="next"
        />
        <AudioPlayerCover 
            key={3}
            title={previousTrack?.name} 
            cover={previousTrack?.album?.images[0]?.url}
            position="back"
        />
      </div>
      <div className="mediaplayer__songs--info">
        <p className="title">{currentTrack?.name} </p>
        <p className="artist">{currentTrack?.artists.map((artist) => (artist.name))}</p>
      </div>
    </div>
  );
};

export default AudioPlayerSongs;
import React from 'react';

const AudioPlayerCover = ({ title, artist, cover, position }) => {
  return (
    <div className={"mediaplayer__songs--" + position}>
      <img className="mediaplayer__songs--cover" src={cover} alt={title} />
    </div>
  );
};

export default AudioPlayerCover;
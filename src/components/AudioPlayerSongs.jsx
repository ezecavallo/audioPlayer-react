import React from 'react';
import '../assets/styles/components/AudioPlayerSongs.css';

class AudioPlayerSongs extends React.Component {
  render () {
    return (
      <div className="mediaplayer__songs">
        <div className="mediaplayer__songs--current">
          <img className="mediaplayer__songs--cover" src="../assets/images/cover/albumcover.jpg" alt="Current song" />
          <div className="mediaplayer__songs--info">
            <p className="title">I see it coming</p>
            <p className="artist">NASAYA, MARO</p>
          </div>
        </div>
        <div className="mediaplayer__songs--back">
          <img className="mediaplayer__songs--cover" src="../assets/images/cover/ab67616d00001e020180c5f180f4d69298a02543.jpg" alt="" />
          <div className="mediaplayer__songs--info">
            <p className="title">I see it coming</p>
            <p className="artist">NASAYA, MARO</p>
          </div>
        </div>
        <div className="mediaplayer__songs--next">
          <img className="mediaplayer__songs--cover" src="../assets/images/cover/ab67616d00001e02b913288a30bced86972d2b3e.jpg" alt="" />
          <div className="mediaplayer__songs--info">
            <p className="title">I see it coming</p>
            <p className="artist">NASAYA, MARO</p>
          </div>
        </div>
      </div>
    );
  };
};

export default AudioPlayerSongs;
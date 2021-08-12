import React from 'react';
import AudioPlayerCover from './AudioPlayerCover';
import '../assets/styles/components/AudioPlayerSongs.css';

class AudioPlayerSongs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: props.items
    }
  }

  componentDidMount() {
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
    const { currentTrack, nextTrack, previousTrack } = this.state.items
    return (
      <div className="mediaplayer__songs--container">
        <div className="mediaplayer__songs">
          <AudioPlayerCover 
              title={currentTrack.name} 
              artist={currentTrack.artists.map((artist) => {artist.name})}
              cover={currentTrack.album.images[1].url}
              position="current"
          />
          <AudioPlayerCover 
              title={nextTrack.name} 
              artist={nextTrack.artists.map((artist) => {artist.name})}
              cover={nextTrack.album.images[1].url}
              position="next"
          />
          <AudioPlayerCover 
              title={previousTrack.name} 
              artist={previousTrack.artists.map((artist) => {artist.name})}
              cover={previousTrack.album.images[1].url}
              position="back"
          />
        </div>
        <div className="mediaplayer__songs--info">
          <p className="title">{currentTrack.name} </p>
          <p className="artist">{currentTrack.artists.map((artist) => (artist.name))}</p>
        </div>
      </div>
    );
  };
};

export default AudioPlayerSongs;
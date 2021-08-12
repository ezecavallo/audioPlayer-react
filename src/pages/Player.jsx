import React from 'react';
import Layout from '../components/Layout';
import AudioPlayer from "../components/AudioPlayer";
import AudioPlayerSongs from "../components/AudioPlayerSongs";
import SpotifyPlayer from '../api/SpotifyPlayer';

class Player extends React.Component{
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {
    return (
      <Layout user={this.props.user}>
        {this.props.player.spotifyPlayerLoaded ? (
          <div className="container">
            <AudioPlayerSongs
              items={this.props.items}
            />
            <AudioPlayer instance={this.props.instance}/>
          </div>
        ) : "Loading" }
      </Layout>
    )
  }
}

export default Player;
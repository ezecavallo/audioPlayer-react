import React from 'react';
import Layout from '../components/Layout';
import AudioPlayer from "../components/AudioPlayer";
import AudioPlayerSongs from "../components/AudioPlayerSongs";
import SpotifyPlayer from '../api/SpotifyPlayer';

// Convert to function
class Player extends React.Component{
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  render() {
    return (
      <Layout user={this.props.user}>
          <div className="container">
            <AudioPlayerSongs
              items={this.props.items}
              access_token={this.props.access_token}
              />
            {this.props.player.spotifyPlayerLoaded ? (
              <AudioPlayer 
                instance={this.props.instance}
                player={this.props.player}
                items={this.props.items}
                access_token={this.props.access_token}
              />
            ) : "Loading" }
          </div>
      </Layout>
    )
  }
}

export default Player;
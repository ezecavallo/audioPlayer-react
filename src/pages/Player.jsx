import React from 'react';
import Layout from '../components/Layout';
import AudioPlayer from "../components/AudioPlayer";
import AudioPlayerSongs from "../components/AudioPlayerSongs";
import SpotifyPlayer from '../api/SpotifyPlayer';

// Convert to function
const Player = (props) => {
  return (
    <Layout user={props.user}>
        <div className="container">
          <AudioPlayerSongs
            items={props.items}
            access_token={props.access_token}
            />
          {props.player.spotifyPlayerLoaded ? (
            <AudioPlayer 
              instance={props.instance}
              player={props.player}
              items={props.items}
              access_token={props.access_token}
            />
          ) : "Loading" }
        </div>
    </Layout>
  );
};

export default Player;
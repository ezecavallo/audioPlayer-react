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
            />
          {props.player.spotifyPlayerLoaded ? (
            <AudioPlayer  
              player={props.player}
              items={props.items}
            />
          ) : "Loading" }
        </div>
    </Layout>
  );
};

export default Player;
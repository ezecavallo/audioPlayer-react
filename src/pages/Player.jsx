import React from 'react';
import Layout from '../components/Layout';
import AudioPlayer from "../components/AudioPlayer";
import AudioPlayerSongs from "../components/AudioPlayerSongs";

const Player = (props) => (
  <Layout>
    <div className="container">
      <AudioPlayerSongs />
      <AudioPlayer instance={props.instance}/>
    </div>
  </Layout>
)

export default Player;
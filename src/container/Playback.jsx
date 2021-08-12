import React from 'react';
import { Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Player from '../pages/Player';
import MediaPlayer from '../api/MediaPlayer';
import SpotifyAPI from '../api/Spotify';

class Playback extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {
        userId: null,
        username: ''
      },
      player: {
        spotifyPlayerLoaded: false,
      },
      loading: true,
      items: {
        loading: true,
        item: {
          album: {
            images: [{ url: "" }]
          },
          name: "",
          artists: [{ name: "" }],
          duration_ms:0,
        },
        item: {
          album: {
            images: [{ url: "" }]
          },
          name: "",
          artists: [{ name: "" }],
          duration_ms:0,
        },
      },
      is_playing: "Paused",
      progress_ms: 0
    };
    this.player = document.getElementById('audio');
    this.controller = new window.AbortController()
    this.signal = this.controller.signal
  }


  async componentDidMount() {
    this.api = new SpotifyAPI();
    this.api.setAccessToken(this.props.auth.access_token);
    await this.getUserProfile(this.signal);
    await this.getRecentlyPlaying(3, this.signal);
    this.loadSpotifyPlayer()

    if (!window.onSpotifyWebPlaybackSDKReady) {
      window.onSpotifyWebPlaybackSDKReady = this.initializeSpotifyPlayer;
    } else {
      this.initializeSpotifyPlayer();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.player.spotifyPlayer) {
      this.state.player.spotifyPlayer.addListener("ready", ({ device_id }) => {
        console.log("Ready wiID");
      });
    }
  }

  componentWillUnmount() {
    this.controller.abort()
  }

  async fetchData(signal) {
    await this.getCurrentlyPlaying(signal);
    await this.getCurrentPlaybackInformation(signal);
  }

  async getUserProfile(signal) {
    const data = await this.api.getMe(signal);
    await this.handleUnauthorized(data)
    console.log(data);
    this.setState({
      user: {
        userId: data.id,
        username: data.display_name
      }
    })
  }

  async getCurrentlyPlaying(signal) {
    try {
      const data = await this.api.getCurrentlyPlaying(signal);
      if (data.error) {
        throw new Error(data.error.message)
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getCurrentPlaybackInformation(signal) {
    try {
      const data = await this.api.getCurrentPlaybackInformation(signal);
      this.handleUnauthorized(data);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getRecentlyPlaying(limit, signal) {
    try {
      const data = await this.api.getRecentlyPlaying(limit, signal);
      this.handleUnauthorized(data);
      this.setState({
        items: {
          loading: false,
          currentTrack: data.items[0].track,
          previousTrack: data.items[1].track,
          nextTrack: data.items[2].track,
        }
      })
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async handleUnauthorized(data) {
    if (data.error?.message === 'Invalid access token' ||
        data.error?.message === 'The access token expired') {
      await this.props.handleRemoveCookie()
      return <Redirect to="/login" />
    }
    return data
  }

  loadSpotifyPlayer() {
    return new Promise((resolve, reject) => {
      const scriptTag = document.getElementById('spotify-player');

      if (!scriptTag) {
        const script = document.createElement('script');

        script.id = 'spotify-player';
        script.type = 'text/javascript';
        script.async = false;
        script.defer = true;
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.onload = () => resolve();
        script.onerror = (error) => reject(new Error(`loadScript: ${error.message}`));

        document.head.appendChild(script);
      } else {
        resolve();
      }
    });
  }

  initializeSpotifyPlayer = () => {
    const token = this.props.auth.access_token;
    const spotifyPlayer = new window.Spotify.Player({
      name: "Web Playback SDK Quick Start Player",
      getOAuthToken: (cb) => {
        cb(token);
      },
    });
    
    // Error handling
    spotifyPlayer.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });
    spotifyPlayer.addListener("authentication_error", ({ message }) => {
      console.error(message);
    });
    spotifyPlayer.addListener("account_error", ({ message }) => {
      console.error(message);
    });
    spotifyPlayer.addListener("playback_error", ({ message }) => {
      console.error(message);
    });
    spotifyPlayer.addListener("player_state_changed", (state) => {
      console.log(state);
    });
    
    // Ready
    spotifyPlayer.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      this.fetchData(this.signal);
    });
    
    // Not Ready
    spotifyPlayer.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });
    
    // Connect to the player!
    this.setState({
      player: {
        spotifyPlayerLoaded: true,
        spotifyPlayer
      }
    }, () => spotifyPlayer.connect())
  };

  render() {
    const { user, player, items } = this.state
    return (
      <React.Fragment>
        {this.props.auth.loggedIn && this.props.auth.access_token ? (
          <Player 
            instance={new MediaPlayer({el: this.player})}
            user={user}
            access_token={this.props.auth.access_token}
            player={player}
            items={items}
            /> ) : (
          <Redirect to="/login" /> 
        )}
      </React.Fragment>
    )
  }
}

export default withCookies(Playback);
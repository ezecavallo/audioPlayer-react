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
        username: '',
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
      progress_ms: 0,
      number: 1
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
    // await this.fetchData(this.signal)
    this.loadSpotifyPlayer()

    if (!window.onSpotifyWebPlaybackSDKReady) {
      window.onSpotifyWebPlaybackSDKReady = this.initializeSpotifyPlayer;
    } else {
      this.initializeSpotifyPlayer();
    }
    this.intervalTick = setInterval(() => {
      this.getTickCurrentlyPlayingTime()
    }, 1000);
      
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.player.spotifyPlayerLoaded) {
      this.state.player.spotifyPlayer.addListener("player_state_changed", (state) => {
        console.log(state);
        if (!state.paused && !this.state.player.playing) {
          this.setState((state) => ({
            player: {
              ...state.player,
              playing: true
            }
          }))
        }
        if (state.paused && this.state.player.playing) {
          this.setState((state) => ({
            player: {
              ...state.player,
              playing: false
            }
          }))
        }
      });
    }
  }

  componentWillUnmount() {
    this.controller.abort()
    window.onSpotifyWebPlaybackSDKReady = null;
  }

  async fetchData(signal) {
    await this.getCurrentlyPlaying(signal);
    await this.getCurrentPlaybackInformation(signal);
  }

  async getUserProfile(signal) {
    const data = await this.api.getMe(signal);
    if (data.error) {
      this.handleUnauthorized(data);
    } else {
      console.log(data);
      this.setState({
        user: {
          userId: data.id,
          username: data.display_name
        }
      });
    }
  }

  async getCurrentlyPlaying(signal) {
    try {
      const data = await this.api.getCurrentlyPlaying(signal);
      if (data.error) {
        throw new Error(data.error.message)
      } else {
        console.log('getCurrentlyPlaying', data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  getTickCurrentlyPlayingTime() {
    
    this.setState((state) => ({number: state.number + 1}))
    if (this.state.player.playing) {
      this.getPlaybackCurrentState();
    }
  }

  getPlaybackCurrentState() {
    this.state.player.spotifyPlayer.getCurrentState().then(state => {
      let {
        paused,
        position,
        repeat_mode,
        shuffle
      } = state
      let {
        current_track,
        next_tracks: [next_track],
        previous_tracks: [previous_track],
      } = state.track_window;
      this.setState((prevState) => {
        const stateToUpdate = {
          player: {
            ...prevState.player,
            // playing: !paused,
            position: position,
            repeat_mode: repeat_mode,
            shuffle: shuffle
          },
          items: {
            loading: false,
            currentTrack: current_track,
            nextTrack: next_track,
            previousTrack: previous_track || prevState.items.previousTrack,
          }
        }
        const itemsToUpdate = {
        }
        // if (prevState.items.currentTrack.name != itemsToUpdate.currentTrack.name) {
        //   stateToUpdate.items = itemsToUpdate;
        // }
        return(stateToUpdate);
      });
    });
  }

  async getCurrentPlaybackInformation(signal) {
    try {
      const data = await this.api.getCurrentPlaybackInformation(signal);
      if (data.error) {
        this.handleUnauthorized(data);
      }
      console.log('getCurrentPlaybackInformation', data);
    } catch (error) {
      console.log(error.message);
    }
  }


  // Go to AudioPLayerSongs
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
      this.props.handleRemoveCookie()
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
      // console.log(state);
    });
    
    // Ready
    spotifyPlayer.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      this.setState({
        player: {
          spotifyPlayerLoaded: true,
          device_id,
          spotifyPlayer,
        }
      })
    });
    
    // Not Ready
    spotifyPlayer.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });
    
    // Connect to the player!
    spotifyPlayer.connect()
  };

  // Utils
  handleRemoveCookie() {
    const { cookies } = this.props;
    cookies.remove("access_token");
    cookies.remove("loggedIn");
    console.log('removed');
    this.setState({
      user: {
        unauthorized: true
      }
    })
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
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
        initialVolume: 30,
        spotifyPlayerLoaded: false,
        spotifyPlayerTransfered: false,
      },
      loading: true,
      items: {
        loading: true,
      },
    };
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
    this.intervalTick = setInterval(() => {
      if (this.state.player.spotifyPlayerTransfered) {
        this.getPlaybackCurrentState();
      }
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.player.spotifyPlayerLoaded) {
      this.state.player.spotifyPlayer.addListener("player_state_changed", (state) => {
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
    // Change cover background
    document.getElementById('app').setAttribute(
      'style', 
      // `--cover-url: url(${this.state.items.currentTrack?.album.images[0].url})`
      `--cover-url: url(${this.state.items.coverCurrentTrack})`
    )  
  }

  componentWillUnmount() {
    this.controller.abort()
    window.onSpotifyWebPlaybackSDKReady = null;
    clearInterval(this.intervalTick);
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

  getPlaybackCurrentState() {
    this.state.player.spotifyPlayer.getCurrentState()
    .then(state => {
      if (!state) {
        return
      }
      let {
        paused,
        position,
        repeat_mode,
        shuffle
      } = state
      let {
        current_track,
        next_tracks: [next_track],
        previous_tracks: [previousTrackFirst, previousTrackSecond],
      } = state.track_window;
      var previous_track = undefined;
      if (!previousTrackSecond) {
        var previous_track = previousTrackFirst;
      } else {
       var previous_track = previousTrackSecond;
      }
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
            coverCurrentTrack: current_track.album.images[0].url
          }
        }
        const itemsToUpdate = {
        }
        // if (prevState.items.currentTrack.name != itemsToUpdate.currentTrack.name) {
        //   stateToUpdate.items = itemsToUpdate;
        // }
        return(stateToUpdate);
      });
    })
    .catch((error) => {
      console.log(error);
    });
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
          coverCurrentTrack: data.items[0].track.album.images[0].url
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
      name: "audioPlayer-react",
      getOAuthToken: (cb) => {
        cb(token);
      },
      volume: this.state.player.initialVolume / 100,
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

    // Ready
    spotifyPlayer.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      this.api.transferUserPlayback(this.signal, device_id);
      this.setState({
        player: {
          spotifyPlayerLoaded: true,
          spotifyPlayerTransfered: true,
          device_id,
          spotifyPlayer,
        }
      })
    });
    
    spotifyPlayer.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });
    
    spotifyPlayer.connect()
  };

  render() {
    const { user, player, items } = this.state
    return (
      <React.Fragment>
        {this.props.auth.loggedIn && this.props.auth.access_token ? (
          <Player 
            player={player}
            items={items}
            user={user}
            /> ) : (
          <Redirect to="/login" /> 
        )}
      </React.Fragment>
    )
  }
}

export default withCookies(Playback);
import React from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../components/Layout';
import AudioPlayer from "../components/AudioPlayer";
import AudioPlayerSongs from "../components/AudioPlayerSongs";

const AUTH_BASE_URL = 'https://accounts.spotify.com/authorize';

const CLIENT_ID = "70aa61f4b8034598819c483a48bfcd08";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
];
const redirectUri = "http://localhost:4000/login";
const authLink = `${AUTH_BASE_URL}?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=${SCOPES.join("%20")}&response_type=token`

let hash = window.location.hash
console.log(hash);
window.location.hash = "";
function getCurrentQueryParameters(delimiter = '#') {
  // the access_token is passed back in a URL fragment, not a query string
  // errors, on the other hand are passed back in a query string
  const currentLocation = String(hash).split(delimiter)[1];
  const params = new URLSearchParams(currentLocation);
  return params;
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateKey: 'auth_state',
      API_STATE: null
    }
  }

  componentDidMount() {
    this.getAPIStateKey();
    const currentQueryParameters = getCurrentQueryParameters('#');
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    // If getAPIStateKey() update API_STATE then...
    if (prevState.API_STATE !== this.state.API_STATE) {
      let _token = this.getAccessToken()
      if (_token) {
        this.props.onUpdateToken(_token)
      }
    }
  }

  getAPIStateKey() {
    const storedState = localStorage.getItem(this.state.stateKey);
    this.setState({
      API_STATE: storedState
    });
    if (!storedState) {
      this.setAPIStateKey();
    }
  }

  setAPIStateKey() {
    const stateValue = this.generateRandomString(12);
    localStorage.setItem(this.state.stateKey, stateValue);
    this.setState({
      API_STATE: stateValue
    })
  }

  generateRandomString(length) {
    let result = '';
    const AlphabetAndNumbers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      result += AlphabetAndNumbers.charAt(Math.floor(Math.random() * AlphabetAndNumbers.length));
    }
    return result;
  };

  getAccessToken() {
    const currentQueryParameters = getCurrentQueryParameters('#');
    let _access_token = currentQueryParameters.get("access_token");
    let state = currentQueryParameters.get("state");
    if (!state) {
      return 
    }
    if (this.state.API_STATE !== state) {
      return console.log('Error')
    } else {
      localStorage.removeItem(this.state.stateKey);
      return _access_token
    }
  }
  

  render() {
    return (
      <div>

        {!this.props.access_token && (
          <a href={authLink + '&state=' + this.state.API_STATE}>
            Login to Spotify
          </a>
        )}
        {this.props.access_token && (
          <Redirect to="/" />
        )}
      </div>
    );
  }
}

export default Login;
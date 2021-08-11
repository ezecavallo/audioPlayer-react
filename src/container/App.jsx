import React from "react";
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import MediaPlayer from "../api/MediaPlayer";
import Login from '../pages/Login';
import Player from '../pages/Player';
import "../assets/styles/normalize.css";
import "../assets/styles/App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: {
        access_token: null,
        loggedIn: false,
      },
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms:0,
      },
      is_playing: "Paused",
      progress_ms: 0
    };
    this.player = document.getElementById('audio');
    this.onUpdateToken = this.onUpdateToken.bind(this)
  }

  onUpdateToken(token) {
    this.setState({
      auth: {
        access_token: token,
        loggedIn: true,
      }
    });
  }

  componentDidMount() {
  }

  render() {
    return (
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {this.state.auth.loggedIn ? (
                <Player 
                instance={new MediaPlayer({el: this.player})} 
                access_token={this.state.auth.access_token}
                /> ) : (
                <Redirect to="/login" /> 
              )}
            </Route>
            <Route exact path="/login">
              <Login 
                access_token={this.state.auth.access_token} 
                onUpdateToken={this.onUpdateToken}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </CookiesProvider>
    )
  }
};

export default App;

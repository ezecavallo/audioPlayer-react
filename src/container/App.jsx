import React from "react";
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from "prop-types";
import Login from '../pages/Login';
import Playback from '../container/Playback';
import "../assets/styles/normalize.css";
import "../assets/styles/App.css";

const ThemeContext = React.createContext('light');

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      auth: {
        access_token: this.props.cookies.get("access_token") || null,
        loggedIn: this.props.cookies.get("loggedIn") || false,
      },
    };
    this.onUpdateToken = this.onUpdateToken.bind(this)
    this.handleRemoveCookie = this.handleRemoveCookie.bind(this)
  }

  onUpdateToken(token) {
    this.setState({
      auth: {
        access_token: token,
        loggedIn: true,
      }
    });
  }

  handleRemoveCookie() {
    const { cookies } = this.props;
    cookies.remove("access_token");
    cookies.remove("loggedIn");
    this.setState({
      auth: {
        access_token: this.props.cookies.get("access_token") || null,
        loggedIn: this.props.cookies.get("loggedIn") || false,
      }
    });
  };

  render() {
    const { auth } = this.state
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Playback 
              auth={auth}
              handleRemoveCookie={this.handleRemoveCookie}
            />
          </Route>
          <Route exact path="/login">
            <Login 
              access_token={this.state.auth.access_token} 
              onUpdateToken={this.onUpdateToken}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    )
  }
};

export default withCookies(App);

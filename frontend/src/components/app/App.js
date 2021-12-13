import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppHeader from "../common/AppHeader";
import Home from "../home/Home";
import Login from "../login/Login";
import NotFound from "../common/NotFound";
import OAuth2RedirectHandler from "../oauth2/OAuth2RedirectHandler";
import { getCurrentUser } from "../../util/APIUtils";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./App.css";
import Signup from "../signup/Signup";
import { Authentication } from "../../services";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogout() {
    Authentication.logout();
    this.setState({
      authenticated: false,
    });
    Alert.success("You've logged out!");
  }

  handleLogin() {
    getCurrentUser()
      .then((response) => {
        Authentication.setAuthData(response.mrn, response.role);
        this.setState({
          authenticated: true,
        });
        if (Authentication.isUserLoggedIntoAdminMode()) {
          this.props.history.push("/admin");
        } else {
          this.props.history.push("/dashboard");
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  render() {
    return (
      <div className="app">
        <div className="app-top-box">
          <AppHeader
            authenticated={this.state.authenticated}
            onLogout={this.handleLogout}
          />
        </div>
        <div className="app-body">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              render={(props) => (
                <Login
                  authenticated={this.state.authenticated}
                  handleLogin={this.handleLogin}
                  {...props}
                />
              )}
            />
            <Route
              path="/signup"
              render={(props) => (
                <Signup authenticated={this.state.authenticated} {...props} />
              )}
            />
            <Route
              path="/api/oauth2/redirect"
              render={(props) => (
                <OAuth2RedirectHandler
                  handleLogin={this.handleLogin}
                  {...props}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Alert
          stack={{ limit: 3 }}
          timeout={3000}
          position="top-right"
          effect="slide"
          offset={65}
        />
      </div>
    );
  }
}

export default App;

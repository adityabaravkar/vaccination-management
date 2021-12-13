import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AppHeader from "../common/AppHeader";
import Home from "../home/Home";
import Login from "../login/Login";
import Admin from "../admin/Admin";
import Clinic from "../admin/Clinic";
import NotFound from "../common/NotFound";
import OAuth2RedirectHandler from "../oauth2/OAuth2RedirectHandler";
import { getCurrentUser } from "../../util/APIUtils";
import { ACCESS_TOKEN } from "../../constants";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "./App.css";
import Disease from "../admin/Disease";
import Vaccine from "../admin/Vaccine";
import Appointment from "../appointment/appointment";
import CheckIn from "../appointment/checkIn";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: response,
          authenticated: true,
        });
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    Alert.success("You've logged out!");
  }

  handleLogin() {
    this.setState({
      authenticated: true,
    });
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
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
              path="/admin"
              render={(props) => (
                <Admin
                  authenticated={this.state.authenticated}
                  handleLogin={this.handleLogin}
                  {...props}
                />
              )}
            />
            <Route
              path="/allClinics"
              render={(props) => (
                <Clinic
                  authenticated={this.state.authenticated}
                  handleLogin={this.handleLogin}
                  {...props}
                />
              )}
            />
            <Route
              path="/allDiseases"
              render={(props) => (
                <Disease
                  authenticated={this.state.authenticated}
                  handleLogin={this.handleLogin}
                  {...props}
                />
              )}
            />
            <Route
              path="/allVaccinations"
              render={(props) => (
                <Vaccine
                  authenticated={this.state.authenticated}
                  handleLogin={this.handleLogin}
                  {...props}
                />
              )}
            />
            <Route
              path="/allAppointments"
              render={(props) => (
                <Appointment
                  authenticated={this.state.authenticated}
                  handleLogin={this.handleLogin}
                  {...props}
                />
              )}
            />
            <Route
              path="/checkin"
              render={(props) => (
                <CheckIn
                  authenticated={this.state.authenticated}
                  handleLogin={this.handleLogin}
                  {...props}
                />
              )}
            />
            <Route
              path="/api/oauth2/redirect"
              component={OAuth2RedirectHandler}
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

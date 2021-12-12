import React, { Component } from "react";
import { ACCESS_TOKEN } from "../../constants";
import { Redirect } from "react-router-dom";

class OAuth2RedirectHandler extends Component {
  getUrlParameter(name) {
    const urlParams = new URLSearchParams(this.props.location.search);
    const param = urlParams.get(name);
    console.log("Param");
    console.log(param);
    return param === null ? "" : param;
  }

  render() {
    const token = this.getUrlParameter("token");
    const error = this.getUrlParameter("error");

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token);
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { from: this.props.location },
          }}
        />
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: {
              from: this.props.location,
              error: error,
            },
          }}
        />
      );
    }
  }
}

export default OAuth2RedirectHandler;

import React, { Component } from "react";
import "../admin/Admin.css";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAppointment: false,
    };
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <h4 style={{ color: "white", fontSize: "25px" }}>
          <center>Your Online Check-In</center>
        </h4>
        <div style={{ display: "flex", justifyContent: "" }}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <h5>Your Appointments</h5>
              </Card.Title>
              Description:
            </Card.Body>
            <Button type="submit">Check-In</Button>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <h5>Your Appointments</h5>
              </Card.Title>
              Description:
            </Card.Body>
            <Button type="submit">Check-In</Button>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <h5>Your Appointments</h5>
              </Card.Title>
              Description:
            </Card.Body>
            <Button type="submit">Check-In</Button>
          </Card>
        </div>
      </div>
    );
  }
}

export default CheckIn;

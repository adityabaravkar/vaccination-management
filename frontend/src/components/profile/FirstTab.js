import React,{useEffect, useState} from "react";
import { getAppointment } from "../../util/APIUtils";
import "./Profile.css";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
const FirstTab = () => {
  useEffect(() => {
    getAppointment()
    .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Error");
      });
}, [])
  return (
    <div className="FirstTab">
      <p><h4 style={{ color: "white", fontSize: "25px" }}>
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
      
    </div></p>
      
    </div>
  );
};
export default FirstTab;
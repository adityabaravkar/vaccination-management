import React,{useEffect, useState} from "react";
import { checkInAppointment, getAppointment } from "../../util/APIUtils";
import "./Profile.css";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
const FirstTab = () => {
  const [state, setstate] = useState("")
  useEffect(() => {
    getAppointment()
    .then((response) => {
      setstate(response);
        console.log(response);
      })
      .catch((error) => {
        console.log("Error");
      });
}, [])

const updateAppointment = (appointmentId) =>{
  checkInAppointment(appointmentId)
  .then((response) => {
    console.log(response);
  })
  .catch((error)=>{
    console.log("Error update");
  })
}

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
        <Button type="submit" >Check-In</Button>
      </Card>
      
    </div></p>
      
    </div>
  );
};
export default FirstTab;
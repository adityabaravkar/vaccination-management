import React, { Component } from "react";
import "./Admin.css";
import {
    Card
   } from 'react-bootstrap';
   
class Clinic extends Component {
  render() {
    return (
      <div class="stageClinic">
      <h4 style={{color:'white', fontSize:'25px'}} >All Available Clinics</h4>
      <div style={{ display: 'flex', justifyContent: '' }}>
                 
                 <Card style={{ width: "18rem" }}>
                 <Card.Body>
                 <Card.Title>
                
                   <h5>Name of the Clinic</h5>
                  
                   </Card.Title>
                Business  Hrs:
                <br/>
                No of Physicians:
                 </Card.Body> 
                 </Card>                           
      </div>
      </div>
    );
  }
}

export default Clinic;

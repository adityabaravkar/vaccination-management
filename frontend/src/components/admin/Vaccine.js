import React, { Component } from "react";
import "./Admin.css";
import {
    Card
   } from 'react-bootstrap';
class Vaccine extends Component {
  render() {
    return (
      <div class="stageClinic">
      <h4 style={{color:'white', fontSize:'25px'}} >All Available Vaccinations</h4>
      <div style={{ display: 'flex', justifyContent: '' }}>
                 
                 <Card style={{ width: "18rem" }}>
                 <Card.Body>
                 <Card.Title>
                
                   <h5>Name of the Vaccine</h5>
                  
                   </Card.Title>
                    Diseases:
                    <br/>
                    Manufacturer:
                    <br/>
                    No. of Shots:
                    <br/>
                    Shot Interval:
                    <br/>
                    Duration:
                 </Card.Body> 
                 </Card>                           
      </div>
      </div>
    );
  }
}

export default Vaccine;

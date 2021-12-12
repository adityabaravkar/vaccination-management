import React, { Component } from "react";
import "./Admin.css";
import {
    Card
   } from 'react-bootstrap';
class Disease extends Component {
  render() {
    return (
      <div class="stageClinic">
      <h4 style={{color:'white', fontSize:'25px'}} >Current Diseases</h4>
      <div style={{ display: 'flex', justifyContent: '' }}>
                 
                 <Card style={{ width: "18rem" }}>
                 <Card.Body>
                 <Card.Title>
                
                   <h5>Name of the Disease</h5>
                  
                   </Card.Title>
                    Description:
                    
                 </Card.Body> 
                 </Card>                           
      </div>
      </div>
    );
  }
}

export default Disease;

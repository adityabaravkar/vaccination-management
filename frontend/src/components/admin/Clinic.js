import React, { Component } from "react";
import "./Admin.css";
import {
    Card
   } from 'react-bootstrap';
   import {
    Button
   } from 'reactstrap';
import {getClinics} from "../../util/APIUtils"; 
class Clinic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allClinics : []
    }
  }
  componentDidMount = async () => {
   
    getClinics()
        .then((response) => {
            const respData = response;
            console.log(respData)
            this.setState({allClinics:respData});
        })
  }
  homePage = ()=>{
    this.props.history.push("/admin");
  }
  render() {
    const {allClinics} = this.state;
    return (
      <div >
      <Button className="stageClinic1" style={{color:'white'}} onClick={this.homePage}>Home Page</Button>
      <h4  className="stageClinic" style={{color:'white', fontSize:'25px'}} >All Available Clinics</h4>
      <br/>
      <div className="card-list">
        {allClinics.map( alld => 
          <div>
            <Card style={{ width: "18rem" }}>
                 <Card.Body>
                 <Card.Title>
                
                   <h5>{alld.clinicName}</h5>
                  
                   </Card.Title>
                Business  Hrs: {alld.businessHours}
                <br/>
                No of Physicians: {alld.numberOfPhysicians}
                <br/>
                Address:
                <br/>
                {alld.streetAndNumber == null ? (""):(<div>{alld.streetAndNumber},</div>)}
                {alld.city},{alld.state},{alld.zipCode}
                 </Card.Body> 
                 </Card> 
          </div>
      )}
      </div>              
     
      </div>
    );
  }
}

export default Clinic;

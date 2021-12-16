import React, { Component } from "react";
import "./Admin.css";
import {
    Card
   } from 'react-bootstrap';
import {getClinics} from "../../util/APIUtils"; 
class Clinic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allClinics : []
    }
  }
  componentDidMount = async () => {
    console.log("hello")
    getClinics()
        .then((response) => {
            const respData = response;
            console.log(respData)
            this.setState({allClinics:respData});
            //  let diseases = [];
            // for (let i = 0; i < respData.length; i++) {
            //     const diseaseData = {

            //         diseaseName: respData[i].diseaseName,
            //     };
            //     diseases.push(diseaseData);

            // }
            // this.setState({diseases:diseases})
           
            
        })
}
  render() {
    const {allClinics} = this.state;
    console.log("all");
    console.log(allClinics)
    var allClinicList = null;
    allClinicList = (
      <div>
        {allClinics.map( alld => 
          <div>
            <Card style={{ width: "18rem" }}>
                 <Card.Body>
                 <Card.Title>
                
                   <h5>{alld.clinicName}</h5>
                  
                   </Card.Title>
                Business  Hrs: {alld.businessHours}
                <br/>
                No of Physicians:{alld.numberOfPhysicians}
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
    );
    return (
      <div >
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

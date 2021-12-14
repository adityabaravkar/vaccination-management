import React, { Component } from "react";
import "./Admin.css";
import {
 Button, Modal, Row, Col
} from 'react-bootstrap';
import {addDisease,addClinic,login} from "../../util/APIUtils";
import {ACCESS_TOKEN} from "../../constants";
import Alert from "react-s-alert";


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show : false,
          showClinic:false,
          showVaccine:false,
          showDisease:false,
          clinicName:'',
          streetAndNumber:'',
          city:'',
          state:'',
          zipCode:'',
          businessHours:'',
          numberOfPhysicians:'',
          diseaseName:'',
          description:'',
          name:'',
          vaccineName:'',
          manufacturer:'',
          shotinterval:'',
          duration:'',
          noofshots:'',
          diseases:[],


        };
      }
    addClinicModal = () =>{
        this.setState({
            show:true
        })
        this.setState({
            showClinic:true
        })
    }
    addDiseaseModal = () =>{
        this.setState({
            show:true
        })
        this.setState({
            showDisease:true
        })
    }
    addVaccineModal = () =>{
        this.setState({
            show:true
        })
        this.setState({
            showVaccine:true
        })
    }
    handleModalClose = () => {
        this.setState({
            show:false
        })
        this.setState({
            showClinic:false
        })
        this.setState({
            showVaccine:false
        })
        this.setState({
            showDisease:false
        })

    }
    showAllClinics = (e) =>{
        window.location.href= "/allClinics";
    }
    showAllVacinations = (e) =>{
        window.location.href= "/allVaccinations";
    }
    
    showAllDiseases = (e) =>{
        window.location.href= "/allDiseases";
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    addClinicDetails = (e) => {
        e.preventDefault();
        const addclinic = {
            clinicName: this.state.clinicName,
            streetAndNumber: this.state.streetAndNumber,
            city:this.state.city,
            state: this.state.state,
            zipCode:this.state.zipCode,
            businessHours:this.state.businessHours,
            numberOfPhysicians:this.state.numberOfPhysicians
        }
        console.log("Inside add clinic");
        const addClinicRequest = Object.assign({}, addclinic);
        addClinic(addClinicRequest)
            .then((response) => {
                console.log("response")
                console.log(response)
                Alert.success("New Clinic Added!");
                this.setState({
                    show:false
                })
                this.props.history.push("/admin");
                this.setState({clinicName : ''});
                this.setState({streetAndNumber : ''});
                this.setState({city : ''});
                this.setState({state : ''});
                this.setState({zipCode : ''});
                this.setState({businessHours : ''});
                this.setState({numberOfPhysicians : ''});
            })
            .catch((error) => {
                Alert.error(
                    "Clinic with the same name already added!"
                );
            });

    }
    addDiseaseDetails = (e) => {
        e.preventDefault();
        const adddisease = {
            diseaseName: this.state.diseaseName,
            description: this.state.description

        }
        console.log("Inside add disease");
        const addDiseaseRequest = Object.assign({}, adddisease);
        addDisease(addDiseaseRequest)
            .then((response) => {
                console.log("response")
                console.log(response)
                Alert.success("New Disease Added!");
                this.setState({
                    show:false
                })
                this.props.history.push("/admin");
                this.setState({diseaseName : ''});
                this.setState({description : ''});
            })
            .catch((error) => {
                Alert.error(
                    "Disease with the same name already added!"
                );
            });
    }
    render() {
        const {showClinic, showDisease, showVaccine} = this.state;
        var clinicForm = null;
        var clinicHead = null;
        if (showClinic){
            clinicHead = (
                <h6>
                  Add Clinic Details
                </h6>
            )
            clinicForm = (
                <div>
                <Col>
                    <span style={{color:'red'}}>* </span> <span style={{color:'gray'}}>Required Fields</span>
                    <Row>
                        <h6>Name of the Clinic<span style={{color:'red'}}>*</span></h6>
                    </Row>
                    <span style={{color:'red'}}></span>
                    <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="clinicName"
                        value={this.state.clinicName} maxLength="45"
                        onChange={this.handleChange}></input>
                    </Row>
                    <br/>
                    <h6>Address</h6>
                    <Row>
                        <Col>
                            <Row>
                            <label>Street and No.</label>
                            </Row>
                            <span style={{color:'red'}}></span>    
                            <Row> 
                            &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="streetAndNumber"
                            value={this.state.streetAndNumber}  maxLength="50"
                            onChange={this.handleChange}></input>
                            </Row>
                        </Col>
                        <Col>         
                            <Row>
                            <label>City<span style={{color:'red'}}>*</span></label>
                            </Row>
                            <span style={{color:'red'}}></span>
                            <Row> 
                            &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="city"
                            value={this.state.city}  maxLength="45"
                            onChange={this.handleChange}></input>
                            </Row>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                     <Col>
                        <Row>
                        <label>State<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}></span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="state"
                        value={this.state.state}  maxLength="45"
                        onChange={this.handleChange}></input>
                        </Row>
                     </Col>      
                     <Col>
                        <Row>
                        <label>Zipcode<span style={{color:'red'}}>*</span></label>
                        </Row>
                        <span style={{color:'red'}}></span>
                        
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="zipCode"
                        value={this.state.zipCode}  maxLength="45"
                        onChange={this.handleChange}></input>
                        </Row>
                    </Col>
                    </Row>
                    <br/>
                    <Row>
                     <Col>
                     <Row>
                        <h6>Business Hours<span style={{color:'red'}}>*</span></h6>
                        </Row>
                        <span style={{color:'red'}}> </span>
                        
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="businessHours"
                        value={this.state.businessHours}   maxLength="10"
                        onChange={this.handleChange}></input>
                        </Row>
                     </Col>
                     
                     <Col>
                        <Row>
                        <h6>Number Of Physicians<span style={{color:'red'}}>*</span></h6>
                        </Row>
                        <span style={{color:'red'}}> </span>
                        
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="numberOfPhysicians"
                        value={this.state.numberOfPhysicians} type="number"
                        onChange={this.handleChange}></input>
                        </Row>
                      </Col>  
                    </Row>  
                    <br/>
                </Col>
                    
                <Button onClick = {this.addClinicDetails}>Save</Button>
                </div>
            )
        }
        if (showDisease){
            clinicHead = (
                <h6>
                  Add Disease Details
                </h6>
            )
            clinicForm = (
                <div>
                <Col>
                    <span style={{color:'red'}}>* </span> <span style={{color:'gray'}}>Required Fields</span>
                    <Row>
                        <h6>Name of the Disease<span style={{color:'red'}}>*</span></h6>
                    </Row>
                    <span style={{color:'red'}}></span>
                    <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="diseaseName"
                        value={this.state.diseaseName} maxLength="45"
                        onChange={this.handleChange}></input>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Row>
                            <h6>Description</h6>
                            </Row>
                            <Row> 
                            &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="description"
                            value={this.state.description}  maxLength="50"
                            onChange={this.handleChange}></input>
                            </Row>
                        </Col>
                    </Row>
                    <br/>
                </Col>  
                <Button onClick = {this.addDiseaseDetails}>Save</Button>
                </div>
            )
        }
        if (showVaccine){
            clinicHead = (
                <h6>
                  Add Vaccine Details
                </h6>
            )
            clinicForm = (
                <div>
                <Col>
                    <span style={{color:'red'}}>* </span> <span style={{color:'gray'}}>Required Fields</span>
                    <Row>
                        <h6>Name of the Vaccine<span style={{color:'red'}}>*</span></h6>
                    </Row>
                    <span style={{color:'red'}}></span>
                    <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="vaccineName"
                        value={this.state.vaccineName} maxLength="45"
                        onChange={this.handleChange}></input>
                    </Row>
                    <br/>
                    
                    <Row>
                        <Col>
                            <Row>
                            <h6>Diseases<span style={{color:'red'}}></span></h6>
                            </Row>
                                
                            <Row> 
                            &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="diseases"
                            value={this.state.diseases}  maxLength="50"
                            onChange={this.handleChange}></input>
                            </Row>
                        </Col>
                        
                    </Row>
                    <br/>
                    <Row>
                     <Col>
                        <Row>
                        <h6>Manufacturer<span style={{color:'red'}}>*</span></h6>
                        </Row>
                        <span style={{color:'red'}}></span>
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="manufacturer"
                        value={this.state.manufacturer}  maxLength="45"
                        onChange={this.handleChange}></input>
                        </Row>
                     </Col>      
                     <Col>
                        <Row>
                        <h6>No. of Shots<span style={{color:'red'}}>*</span></h6>
                        </Row>
                        <span style={{color:'red'}}></span>
                        
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="noofshots"
                        value={this.state.noofshots}  maxLength="45"
                        onChange={this.handleChange}></input>
                        </Row>
                    </Col>
                    </Row>
                    <br/>
                    <Row>
                     <Col>
                     <Row>
                        <h6>Shot Interval</h6>
                        </Row>
                        <span style={{color:'red'}}> </span>
                        
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="shotinterval"
                        value={this.state.shotinterval}
                        onChange={this.handleChange}></input>
                        </Row>
                     </Col>
                     
                     <Col>
                        <Row>
                        <h6>Duration<span style={{color:'red'}}>*</span></h6>
                        </Row>
                        <span style={{color:'red'}}> </span>
                        
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="duration"
                        value={this.state.duration}
                        onChange={this.handleChange}></input>
                        </Row>
                      </Col>  
                    </Row>  
                    <br/>
                </Col>      
                <Button onClick = {this.addVaccineDetails}>Save</Button>
                </div>
            )
        }
        return (
            <div class="">
                <div className="container1">
                   
                    <Button className="adminbtns" onClick = {this.addClinicModal}>Add Clinic</Button>
                    <Button className="adminbtns" onClick = {this.addDiseaseModal}>Add Disease</Button>
                    <Button className="adminbtns" onClick = {this.addVaccineModal}>Add Vaccine</Button>
                   <br/>
                    <Button className="adminbtns" onClick = {this.showAllClinics}>All Clinics</Button>
                    <Button className="adminbtns" onClick = {this.showAllDiseases}>All Diseases</Button>
                    <Button className="adminbtns" onClick = {this.showAllVacinations}>All Vaccines</Button>
                   
               </div>
               <div>
              <Modal size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered 
              show={this.state.show} onHide={()=>this.handleModalClose()}>
                <Modal.Header closeButton>{clinicHead}</Modal.Header>
                <Modal.Body>
                {clinicForm}
                </Modal.Body>
                
              </Modal>
      			</div>
            </div>
        );
    }
}

export default Admin;

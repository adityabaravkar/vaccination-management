import React, { Component } from "react";
import "./Admin.css";
import {
 Button, Modal, Row, Col
} from 'react-bootstrap';
import {addDisease, login} from "../../util/APIUtils";
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
          streetNo:'',
          city:'',
          state:'',
          zipcode:'',
          businessHrs:'',
          noOfPhysicians:'',
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
    addDiseaseDetails = (e) => {

        e.preventDefault();
        const addD = {
            name: this.state.name,
            description: this.state.description

        }
        console.log("Inside add disease");
        console.log(typeof(this.state.name))
        console.log(typeof(this.state.description))
        const addDiseaseRequest = Object.assign({}, addD);
        addDisease(addDiseaseRequest)
            .then((response) => {
                Alert.success("New Disease Added!");
               // this.props.history.push("/admin");
            })
            .catch((error) => {
                Alert.error(
                    (error && error.message) ||
                    "Oops! Something went wrong. Please try again!"
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
                            &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="streetNo"
                            value={this.state.streetNo}  maxLength="50"
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
                        &nbsp;&nbsp;&nbsp;<input style={{width:'80%'}} name="zipcode"
                        value={this.state.zipcode}  maxLength="45"
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
                        &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="businessHrs"
                        value={this.state.businessHrs}   maxLength="5"
                        onChange={this.handleChange}></input>
                        </Row>
                     </Col>
                     
                     <Col>
                        <Row>
                        <h6>Number Of Physicians<span style={{color:'red'}}>*</span></h6>
                        </Row>
                        <span style={{color:'red'}}> </span>
                        
                        <Row> 
                        &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="noOfPhysicians"
                        value={this.state.noOfPhysicians} type="number"
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
                        &nbsp;&nbsp;&nbsp;<input style={{width:'50%'}} name="name"
                        value={this.state.name} maxLength="45"
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

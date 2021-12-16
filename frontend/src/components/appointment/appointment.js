import React, { Component } from "react";
import "../admin/Admin.css";
import { Card } from "react-bootstrap";
import { Button, Row, Col } from "react-bootstrap";
import Alert from "react-s-alert";
import { cancelAppointment, getAllAppointments } from "../../util/APIUtils";
import Container from "react-bootstrap/Container";
import MakeAppointment from "./makeAppointment";
import UpdateAppointment from "./updateAppointment";
import swal from "sweetalert";
import { Authentication } from "../../services";

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount = async () => {
    const patientId = Authentication.userId;
    getAllAppointments(patientId)
      .then((response) => {
        this.setState({
          appointments: response,
        });
      })
      .catch((error) => {
        Alert.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
      });
  };

  cancelApt = (aptID) => (e) => {
    console.log("cancel Appt");
    console.log(aptID);
    cancelAppointment(aptID).then((response) => {
      swal({
        title: "Are you sure?",
        text: "Your Appointment will be cancelled",
        type: "warning",
        buttons: ["No,keep it", "Yes, cancel it!"],
        // showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel it!",
      }).then(function (isConfirm) {
        if (isConfirm) {
          swal(
            "Cancelled!",
            "Your Appointment has been successfully cancelled!.",
            "success"
          ).then((okay) => {
            if (okay) {
              window.location.reload();
            }
          });
        } else {
          swal(
            "Cancelled",
            "There was some problem canceling your appointment! Please try again later!!",
            "error"
          );
        }
      });
    });
  };

  makeAppointment = (e) => {
    e.preventDefault();
    console.log("inside save operation for making an appointment");
    var currentDate = new Date();
    var datetime =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate() +
      "-" +
      currentDate.getHours() +
      "-" +
      currentDate.getMinutes();
    const appointmentDate = this.state.aptDate.concat(
      "-",
      this.state.aptTime,
      "-",
      this.state.aptMin
    );
    const data = {
      patientId: Authentication.userId,
      appointmentTime: appointmentDate,
      currentTime: datetime,
      vaccinationIds: ["3"],
      clinicId: this.state.clinicId,
    };
    console.log("data:", data);

    const addAptRequest = Object.assign({}, data);
    // makeAppointment(addAptRequest)
    //   .then((response) => {
    //     Alert.success("You have successfully booked your appointment!");
    //     this.handleModalClose();
    //     // this.props.history.push("/admin");
    //   })
    //   .catch((error) => {
    //     Alert.error(
    //       (error && error.message) ||
    //         "Oops! Something went wrong. Please try again!"
    //     );
    //   });
  };

  render() {
    console.log("appointments", this.state.appointments);
    return (
      <div className="">
      <div><MakeAppointment /></div> 
      
          
          <Container>
      <h4 style={{ color: "white", fontSize: "25px" }}>
        <center>Check - In Online!</center>
      </h4>
      <br />
      <Row xs={4}>
       
            <Col>
              <div style={{ display: "flex", justifyContent: "", color:"black" }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title tag="h6">Ref Id: </Card.Title>
                    <Card.Subtitle tag="h7" className="mb-2 text-muted">
                      Status: 
                    </Card.Subtitle>
                    <Card.Text>
                      <u>Clinic:</u> 
                      <br />
                      <u>Date:</u> 
                      <br />
                      <u>Time:</u> 
                      <br />
                    </Card.Text>
                    <Button
                      type="submit"
                     
                    >
                      Checkin
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                  </Card.Body>
                </Card>
              </div>
              <br />
            </Col>
            <Col>
              <div style={{ display: "flex", justifyContent: "", color:"black" }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title tag="h6">Ref Id: </Card.Title>
                    <Card.Subtitle tag="h7" className="mb-2 text-muted">
                      Status: 
                    </Card.Subtitle>
                    <Card.Text>
                      <u>Clinic:</u> 
                      <br />
                      <u>Date:</u> 
                      <br />
                      <u>Time:</u> 
                      <br />
                    </Card.Text>
                    <Button
                      type="submit"
                     
                    >
                      Checkin
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <br />
                  </Card.Body>
                </Card>
              </div>
              <br />
            </Col>
            <Col>
            <div style={{ display: "flex", justifyContent: "", color:"black" }}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title tag="h6">Ref Id: </Card.Title>
                  <Card.Subtitle tag="h7" className="mb-2 text-muted">
                    Status: 
                  </Card.Subtitle>
                  <Card.Text>
                    <u>Clinic:</u> 
                    <br />
                    <u>Date:</u> 
                    <br />
                    <u>Time:</u> 
                    <br />
                  </Card.Text>
                  <Button
                    type="submit"
                   
                  >
                    Checkin
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <br />
                </Card.Body>
              </Card>
            </div>
            <br />
          </Col>
      </Row>
      
    </Container>
      </div>
    );
  }
}

export default Appointment;

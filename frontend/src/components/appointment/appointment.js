import React, { Component } from "react";
import "../admin/Admin.css";
import { Card } from "react-bootstrap";
import { Button, Modal, Row, Col } from "react-bootstrap";
import Alert from "react-s-alert";
import { makeAppointment, getClinics, login } from "../../util/APIUtils";
import { Authentication } from "../../services";

class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAppointment: false,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  addAppointmentModal = () => {
    this.setState({
      show: true,
    });
    this.setState({
      showAppointment: true,
    });
  };
  handleModalClose = () => {
    this.setState({
      show: false,
    });
    this.setState({
      showAppointment: false,
    });
  };
  componentDidMount = async () => {
    getClinics()
      .then((response) => {
        const respData = JSON.stringify(response);
        console.log("response for all clinic" + response.name);
        let clinics = [];
        for (let i = 0; i < respData.length; i++) {
          const clinicData = {
            id: respData[i].clinicId,
            name: respData[i].name,
          };
          clinics.push(clinicData);
        }
        // Alert.success("You have successfully booked your appointment!");
        // this.props.history.push("/admin");
      })
      .catch((error) => {
        Alert.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
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
    console.log("datetime:", datetime);
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
      clinicId: "127",
    };
    console.log(typeof data.patientId);
    console.log("data:", data);

    const addAptRequest = Object.assign({}, data);
    makeAppointment(addAptRequest)
      .then((response) => {
        Alert.success("You have successfully booked your appointment!");
        this.handleModalClose();
        // this.props.history.push("/admin");
      })
      .catch((error) => {
        Alert.error(
          (error && error.message) ||
            "Oops! Something went wrong. Please try again!"
        );
      });
  };

  render() {
    const { showAppointment } = this.state;
    var aptForm = null;
    var aptHeader = null;
    if (showAppointment) {
      aptHeader = (
        <h6>
          <strong>Book your appointment today!</strong>
        </h6>
      );
      aptForm = (
        <div>
          <Col>
            <span style={{ color: "red" }}>* </span>{" "}
            <span style={{ color: "gray" }}>Required Fields</span>
            <Row>
              <Row>
                <div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
                  <select
                    className="form-control"
                    id="clinicList"
                    onChange={this.onChange}
                  >
                    <option value="" selected disabled hidden>
                      Select Clinic
                    </option>
                    <option value="clinic1">Cross Over</option>
                    <option value="clinic2">Santa Clara County hall</option>
                  </select>
                </div>
              </Row>
              <br />
              <Row>
                &nbsp;&nbsp;&nbsp;
                <div className="form-group d-sm-flex margin">
                  <div className="d-flex align-items-center flex-fill ms-sm-1 my-sm-0 my-4 border-bottom position-relative">
                    <input
                      type="date"
                      required
                      placeholder="Appointment Date"
                      id="aptDate"
                      name="aptDate"
                      className="form-control"
                      onChange={this.onChange}
                    />
                    <div className="label" id="return"></div>
                  </div>
                </div>
              </Row>
            </Row>
            <span style={{ color: "red" }}></span>
            <Row>
              &nbsp;&nbsp;&nbsp;
              <div className="form-group d-sm-flex margin">
                <div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
                  <select
                    className="form-control"
                    id="aptTime"
                    name="aptTime"
                    onChange={this.onChange}
                  >
                    <option value="" selected disabled hidden>
                      Select hour
                    </option>
                    <option value="00">00</option>
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="20">21</option>
                    <option value="20">22</option>
                    <option value="20">23</option>
                  </select>
                </div>
                <div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
                  <select
                    className="form-control"
                    id="aptMin"
                    name="aptMin"
                    onChange={this.onChange}
                  >
                    <option value="" selected disabled hidden>
                      Select minutes
                    </option>
                    <option value="00">00</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                  </select>
                </div>
              </div>
            </Row>
            <br />
            <Row>
              <div className="d-flex align-items-center flex-fill me-sm-1 my-sm-0 my-4 border-bottom position-relative">
                <select
                  className="form-control"
                  id="vaccinationList"
                  name="vaccinationList"
                  onChange={this.onChange}
                >
                  <option value="" selected disabled hidden>
                    Select vaccinations
                  </option>
                  <option value="00">Moderna</option>
                  <option value="15">Flu Shot</option>
                  <option value="30">Covishield</option>
                  <option value="45">Covaxin</option>
                </select>
              </div>
            </Row>
          </Col>
          <br />
          <Button onClick={this.makeAppointment}>Save</Button>
        </div>
      );
    }
    return (
      <div>
        {" "}
        {/*class="stageClinic" */}
        <Button onClick={this.addAppointmentModal}>
          Make an Appointments
        </Button>{" "}
        <h4 style={{ color: "white", fontSize: "25px" }}>
          <center>Current Appoinment</center>
        </h4>
        <div style={{ display: "flex", justifyContent: "" }}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <h5>Your Appointments</h5>
              </Card.Title>
              Description:
            </Card.Body>
            <Button type="submit">Cancel</Button>
            <br />
            <Button type="submit">Change</Button>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <h5>Your Appointments</h5>
              </Card.Title>
              Description:
            </Card.Body>
            <Button type="submit">Cancel</Button>
            <br />
            <Button type="submit">Change</Button>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                <h5>Your Appointments</h5>
              </Card.Title>
              Description:
            </Card.Body>
            <Button type="submit">Cancel</Button>
            <br />
            <Button type="submit">Change</Button>
          </Card>
        </div>
        <div>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.show}
            onHide={() => this.handleModalClose()}
          >
            <Modal.Header closeButton>{aptHeader}</Modal.Header>
            <Modal.Body>{aptForm}</Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Appointment;

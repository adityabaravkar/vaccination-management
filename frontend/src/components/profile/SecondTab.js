import React, {useEffect, useState} from "react";
import { Card } from "react-bootstrap";
import { Button, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { getAppointment } from "../../util/APIUtils";
const SecondTab = () => {

    const [state, setstate] = useState("")

    useEffect(() => {
        getAppointment()
        .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log("Error");
          });
    }, [])
  return (
    <div className="">
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
                      Status: cancelled
                    </Card.Subtitle>
                    <Card.Text>
                      <u>Clinic: sjsu</u> 
                      <br />
                      <u>Date: </u> 
                      <br />
                      <u>Time:</u> 
                      <br />
                    </Card.Text>
                   
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
};
export default SecondTab;
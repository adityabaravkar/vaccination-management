import React, { Component } from "react";
import "./Admin.css";
import {
    Card
} from 'react-bootstrap';
import {
    Button
} from 'reactstrap';
import {getAllDiseases} from "../../util/APIUtils";
class AdminReports extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDiseases : []
        }
    }
    componentDidMount = async () => {
        console.log("hello")
        getAllDiseases()
            .then((response) => {
                const respData = response;
                console.log(respData)
                this.setState({allDiseases:respData});
            })
    }
    homePage = ()=>{
        this.props.history.push("/admin");
    }


    render() {
        const {allDiseases} = this.state;

        return (
            <div >
                <Button className="stageClinic1" style={{color:'white'}} onClick={this.homePage}>Home Page</Button>
                <h4  className="stageClinic" style={{color:'white', fontSize:'25px'}} >System Report</h4>
                <br/>
                <div className="card-list">

                </div>
            </div>

        );
    }
}

export default AdminReports;

import logo from "../assets/FSAE-Logo.png";
import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService';
import Register from '../api-authorization/Register';

export class RegistrationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRegistered: false
        };
    }

    componentDidMount() {
        this.populateState();
    }

    async populateState() {
        const [isRegistered] = await Promise.all([authService.isRegistered()])
        this.setState({
            isRegistered
        });
    }

    render() {
        const { isRegistered } = this.state;
        if (!isRegistered) {
            return this.registrationView();
        } else {
            return this.registeredView();
        }
    }

    registrationView() {
        return (
            <div className="register-page" >
                <a href="/">
                    <img className="logo-img" src={logo} atl="CSUN LOGO" />
                </a>
                <h1>Join us!</h1>   
                <h2>Register Procedure</h2>
                <p>You must register with a CSUN email address.</p>
                <p>Once your registration is complete, an admin will need to approve your request.</p>
                <Register />
            </div>
        );
    }

    registeredView() {  
        return (
            <div className="register-page" >
                <a href="/">
                    <img className="logo-img" src={logo} atl="CSUN LOGO" />
                </a>
                <div>
                    <h1>Success!</h1>
                    <br></br>
                    <h2>You have successfully registered for CSUN Matador Motorsports</h2>
                    <br></br><br></br>
                    <h4>Your request is currently being reviewed. Once you are approved, <br></br>you will receive an email indicating you have been granted access.</h4>
                </div>
            </div>
        );
    }
}
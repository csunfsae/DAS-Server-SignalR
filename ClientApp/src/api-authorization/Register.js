import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import authService from './AuthorizeService';
import { AuthenticationResultStatus } from './AuthorizeService';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: undefined
        };
    }

    onSuccess = async googleData => {
        const result = await authService.register(googleData);
        switch (result.status) {
            case AuthenticationResultStatus.Success:
                await this.navigateToReturnUrl();
                break;
            case AuthenticationResultStatus.Fail:
                this.setState({ message: result.message });
                break;
            default:
                throw new Error(`Invalid status result ${result.status}.`);
        }
    };

    OnFailure = (res) => {
        alert("Google authentication failed.", res)
    };

    render() {
        const { message } = this.state;

        if (!!message) {
            alert(message);
        }
        return (
            <div id="register-button">
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Register"
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                />
            </div>
        );
    }

    navigateToReturnUrl() {
        // It's important that we do a replace here so that we remove the callback uri with the
        // fragment containing the tokens from the browser history.
        window.location.replace("/register");
    }
}

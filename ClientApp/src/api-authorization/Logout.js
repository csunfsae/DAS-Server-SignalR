import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';
import authService from './AuthorizeService';

export default class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: undefined
        };
    }

    onSuccess = async () => {
        await authService.signOut();
        await this.navigateToReturnUrl();
    };

    OnFailure = (res) => {
        alert("Google authentication failed.", res)
    };

    render() {
        const { message } = this.state;

        if (!!message) {
            return <div>{message}</div>
        } else {
            return (
                <div id="login-button">
                    <GoogleLogout
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={this.onSuccess}
                        isSignedIn={false}
                    />
                </div>
            );
        }
    }

    navigateToReturnUrl() {
        // It's important that we do a replace here so that we remove the callback uri with the
        // fragment containing the tokens from the browser history.
        window.location.replace("/");
    }
}
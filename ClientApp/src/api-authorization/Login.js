import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import authService from './AuthorizeService';
import { AuthenticationResultStatus } from './AuthorizeService';
import Notifications from '../components/Notifications';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: undefined
            //visibility: false
        };
    }

    onSuccess = async googleData => {
        const result = await authService.signIn(googleData);
        //this.setState({ visibility: false });
        switch (result.status) {
            case AuthenticationResultStatus.Success:
                await this.navigateToReturnUrl();
                break;
            case AuthenticationResultStatus.Fail:
                this.setState({ message: result.message, visibility: true });
                //this.setState({ visibility: 'show' });
                break;
            default:
                throw new Error(`Invalid status result ${result.status}.`);
        }
    };

    onTimeout() {
        this.setState({ open: false })
    }

    OnFailure = (res) => {
        alert("Google authentication failed.", res)
    };

    handleMsg = () => {
        console.log('showing error msg notification')
        //this.setState({ visibility: 'show' });
    };

    render() {
        const { message } = this.state;

        if (!!message) {
            //this.setState({ visibility: 'hidden' });
            //this.setState({ visibility: 'show' });
            alert(message);
            console.log(this.state.visibility);
            //this.handleMsg();
        }

        //const { open } = this.state;
        //<Message open={open} onTimeout={this.onTimeout} message="..." timeout={5000} />
        return (
            <div id="login-button">
                <Notifications message={message} visibility={this.state.visibility} type="login" />
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login"
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
        window.location.replace("/");
    }
}


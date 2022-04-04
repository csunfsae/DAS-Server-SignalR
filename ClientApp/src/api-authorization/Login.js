import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import authService from './AuthorizeService';
import { AuthenticationResultStatus } from './AuthorizeService';
import { connect } from 'react-redux';
//import { useSelector, useDispatch } from 'react-redux';
import { LOGGEDIN, loggedin, loggedout } from '../actions/userRoleAction';

//const dispatch = useDispatch();
//const role = useSelector((state) => state.userRole.role)

class Login extends Component {
    constructor() {
        super();

        this.state = {
            message: undefined
        };
    }

    onSuccess = async googleData => {
        const result = await authService.signIn(googleData);
        switch (result.status) {
            case AuthenticationResultStatus.Success:
                await this.navigateToReturnUrl();
                //NEED TO FIGURE OUT HOW TO GET THE USER RETURN OBJECT SO WE CAN STORE IT INTO REDUX
                //this.props.setRole("Admin");
                window.sessionStorage.setItem("userRole", "Admin");
                console.log("The USER ROLE STATE fetched from redux is: " + this.props.userRole.role);
                break;
            case AuthenticationResultStatus.Fail:
                this.setState({ message: result.message });
                this.props.setRole("Basic");
                console.log("The USER ROLE STATE fetched from redux is: " + this.props.userRole.role);
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
            <div id="login-button">
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

const mapStateToProps = (state) => {
    return {
        userRole: state.userRole
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setRole: (role) => {
            dispatch(loggedin(role));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);



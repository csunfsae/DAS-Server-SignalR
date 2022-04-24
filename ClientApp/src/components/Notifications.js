import React, { Component } from 'react';

export default class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: this.props.message,
            //visibility: this.props.visibility,
            type: this.props.type
        };
    }

    onTimeout() {
        this.setState({ open: false })
    }

    //This below is important for updating changed props
    componentWillReceiveProps(nextProps) {
        this.setState({ message: nextProps.message, visibility: nextProps.visibility });
        this.updateNotification(nextProps.message);
    }

    //check if the other notification is on
    updateNotification(message) {
        console.log("updating the notification for " + this.state.type + ' with message error ' + this.state.message);

        const registerNotification = document.getElementById('register');
        const loginNotification = document.getElementById('login');

        if (this.state.type === 'login' && message) {
            //if another notification is visible, hide it
            if (registerNotification)
                document.getElementById('register').style.visibility = 'hidden';

            document.getElementById('login').style.visibility = 'visible';
        } else if (this.state.type === 'register' && message) {
            //if another notification is visible, hide it
            if (loginNotification)
                document.getElementById('login').style.visibility = 'hidden';

            document.getElementById('register').style.visibility = 'visible';
        }
    }

    render() {
        {console.log(this.state.visibility)}
        return (
            <div className="notification" id={this.props.type} style={{ visibility: 'hidden' }}>
                <p>{this.state.message}</p>
            </div>
        );
    }

    navigateToReturnUrl() {
        // It's important that we do a replace here so that we remove the callback uri with the
        // fragment containing the tokens from the browser history.
        window.location.replace("/");
    }
}


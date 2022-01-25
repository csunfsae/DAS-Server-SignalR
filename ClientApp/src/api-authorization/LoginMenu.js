import React, { Component, Fragment } from 'react';
import Login from '../api-authorization/Login';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `/register`;
            return this.anonymousView(registerPath);
        } else {
            const livePath = '/live-race'
            //const profilePath = `${ApplicationPaths.Profile}`;
            //const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, livePath);
        }
    }

    authenticatedView(userName, livePath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={livePath}>Hello {userName}</NavLink>
            </NavItem>
            <NavItem>

            </NavItem>
        </Fragment>);

    }

    anonymousView(registerPath) {
        return (<Fragment>
            <NavItem>
                <Login></Login>
                <p id="register-button">Don't have an account? <a href={registerPath}>Register</a></p>
                {/*<NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>*/}
            </NavItem>
        </Fragment>);
    }

}
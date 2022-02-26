import React, { Component, Fragment } from 'react';
import Login from '../api-authorization/Login';
import Logout from '../api-authorization/Logout';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false
        };
    }

    componentDidMount() {
        this.populateState();
    }

    async populateState() {
        const [isAuthenticated] = await Promise.all([authService.isAuthenticated()])
        this.setState({
            isAuthenticated
        });
    }

    render() {
        const { isAuthenticated } = this.state;
        if (!isAuthenticated) {
            const registerPath = `/register`;
            return this.anonymousView(registerPath);
        } else {
            const livePath = '/live-race'
            const historyPath = '/history'
            const teamsPath = '/teams'
            return this.authenticatedView(livePath, historyPath, teamsPath);
        }
    }

    authenticatedView(livePath, historyPath, teamsPath) {
        return (
            <Fragment>
                <NavItem className="nav-links">
                    <Logout></Logout>
                </NavItem>
                <NavItem className="nav-links">
                    <NavLink tag={Link} className="text-dark" to={livePath}>Live Race</NavLink>
                </NavItem>
                <NavItem className="nav-links">
                    <NavLink tag={Link} className="text-dark" to={historyPath}>History</NavLink>
                </NavItem>
                <NavItem className="nav-links">
                    <NavLink tag={Link} className="text-dark" to={teamsPath}>Teams</NavLink>
                </NavItem>
            </Fragment>);
    }

    anonymousView(registerPath) {
        return (
            <Fragment>
                <NavItem>
                    <Login></Login>
                </NavItem>
                <NavItem>
                    <p id="register-link">Don't have an account? <a href={registerPath}>Register</a></p>
                </NavItem>
            </Fragment>);
    }

}
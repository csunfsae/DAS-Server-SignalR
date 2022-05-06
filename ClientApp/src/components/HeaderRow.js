import React, { Component, Fragment } from 'react';

export default class ReadOnlyRow extends Component {
    static displayName = ReadOnlyRow.name;

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            this.props.userRole === "Admin" ? (
                <tr>
                    <th id="cell">First Name</th>
                    <th id="cell">Last Name</th>
                    <th id="cell">Email</th>
                    <th id="cell">Team</th>
                    <th id="cell">Role</th>
                    <th id="cell">Actions</th>
                </tr>
            ) : (
                <tr>
                    <th id="cell">First Name</th>
                    <th id="cell">Last Name</th>
                    <th id="cell">Email</th>
                    <th id="cell">Team</th>
                    <th id="cell">Role</th>
                </tr>
            )

        );
    }
}
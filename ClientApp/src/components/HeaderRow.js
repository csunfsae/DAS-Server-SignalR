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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Team</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            ) : (
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Team</th>
                    <th>Role</th>
                </tr>
            )

        );
    }
}
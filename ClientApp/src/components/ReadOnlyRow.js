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
                    <td id="cell">{this.props.contact.firstName}</td>
                    <td id="cell">{this.props.contact.lastName}</td>
                    <td id="cell">{this.props.contact.email}</td>
                    <td id="cell">{this.props.contact.team}</td>
                    <td id="cell">{this.props.contact.role}</td>
                    <td id="cell">
                        <button
                            type="button"
                            class="btn btn-primary btn-sm"
                            style={{ width: '80px' }}
                            onClick={(event) => this.props.handleEditClick(event, this.props.contact)}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary btn-sm"
                            style={{width: '80px', margin: '0 5px'}}
                            onClick={() => this.props.handleDeleteClick(this.props.contact.googleId)}>
                            Delete
                        </button>
                    </td>
                </tr>
            ) : (
                <tr>
                    <td>{this.props.contact.firstName}</td>
                    <td>{this.props.contact.lastName}</td>
                    <td>{this.props.contact.email}</td>
                    <td>{this.props.contact.team}</td>
                    <td>{this.props.contact.role}</td>
                </tr>
            )

        );
    }
}
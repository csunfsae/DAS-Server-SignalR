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
            <tr>
                <td>{this.props.contact.firstName}</td>
                <td>{this.props.contact.lastName}</td>
                <td>{this.props.contact.email}</td>
                <td>{this.props.contact.team}</td>
                <td>{this.props.contact.role}</td>
                <td>
                    <button
                        type="button"
                        onClick={(event) => this.props.handleEditClick(event, this.props.contact)}
                    >
                        Edit
                    </button>
                    <button type="button" onClick={() => this.props.handleDeleteClick(this.props.contact.id)}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
}
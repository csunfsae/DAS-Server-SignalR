import React, { Component, Fragment } from 'react';

export default class EditableRow extends Component {
    static displayName = EditableRow.name;

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
                <td>
                    <select name="team" value={this.props.editFormData.team} onChange={this.props.handleEditFormChange}>
                        <option value="Unassigned">Unassigned</option>
                        <option value="Suspension">Suspension</option>
                        <option value="Chassis">Chassis</option>
                        <option value="Engine">Engine</option>
                        <option value="Controls">Controls</option>
                    </select>
                </td>
                <td>
                    <select name="role" value={this.props.editFormData.role} onChange={this.props.handleEditFormChange}>
                        <option value="Basic">Basic</option>
                        <option value="Lead">Lead</option>
                        <option value="Admin">Admin</option>
                    </select>
                </td>
                <td>
                    <button type="submit">Save</button>
                    <button type="button" onClick={this.props.handleCancelClick}>
                        Cancel
                    </button>
                </td>
            </tr>
        );
    }
}
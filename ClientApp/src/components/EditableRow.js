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
                <td id="cell">{this.props.contact.firstName}</td>
                <td id="cell">{this.props.contact.lastName}</td>
                <td id="cell">{this.props.contact.email}</td>
                <td id="cell">
                    <select name="team" value={this.props.editFormData.team} onChange={this.props.handleEditFormChange}>
                        <option value="Unassigned">Unassigned</option>
                        <option value="Suspension">Suspension</option>
                        <option value="Chassis">Chassis</option>
                        <option value="Engine">Engine</option>
                        <option value="Controls">Controls</option>
                    </select>
                </td>
                <td id="cell">
                    <select name="role" value={this.props.editFormData.role} onChange={this.props.handleEditFormChange}>
                        <option value="Basic">Basic</option>
                        <option value="Lead">Lead</option>
                        <option value="Admin">Admin</option>
                    </select>
                </td>
                <td id="cell">
                    <button
                        type="submit"
                        class="btn btn-success btn-sm"
                        style={{ width: '80px' }}>
                        Save
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        style={{ width: '80px', margin: '0 5px' }} onClick={this.props.handleCancelClick}>
                        Cancel
                    </button>
                </td>
            </tr>
        );
    }
}
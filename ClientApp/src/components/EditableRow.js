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
                <td>
                    <input
                        type="text"
                        required="required"
                        placeholder="Enter a first name..."
                        name="firstName"
                        value={this.props.editFormData.firstName}
                        onChange={this.props.handleEditFormChange}
                    ></input>
                </td>
                <td>
                    <input
                        type="text"
                        required="required"
                        placeholder="Enter a last name..."
                        name="lastName"
                        value={this.props.editFormData.lastName}
                        onChange={this.props.handleEditFormChange}
                    ></input>
                </td>
                <td>
                    <input
                        type="email"
                        required="required"
                        placeholder="Enter an email..."
                        name="email"
                        value={this.props.editFormData.email}
                        onChange={this.props.handleEditFormChange}
                    ></input>
                </td>
                <td>
                    {/* <input
          type="text"
          required="required"
          placeholder="Enter a team..."
          name="team"
          value={editFormData.team}
          onChange={handleEditFormChange}
        ></input> */}
                    <select name="team" value={this.props.editFormData.team} onChange={this.props.handleEditFormChange}>
                        <option value="Unassigned">Unassigned</option>
                        <option value="Suspension">Suspension</option>
                        <option value="Chasis">Chasis</option>
                        <option value="Engine">Engine</option>
                        <option value="Control">Control</option>
                    </select>
                </td>
                <td>
                    {/* <input
          type="text"
          required="required"
          placeholder="Enter an role"
          name="role"
          value={editFormData.role}
          onChange={handleEditFormChange}
        ></input> */}
                    <select name="role" value={this.props.editFormData.role} onChange={this.props.handleEditFormChange}>
                        <option value="Basic">Basic</option>
                        <option value="Team Lead">Team Lead</option>
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
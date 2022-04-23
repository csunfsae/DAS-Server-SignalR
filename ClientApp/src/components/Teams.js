import React, { Component, Fragment } from 'react';
import authService from '../api-authorization/AuthorizeService';
import { nanoid } from "nanoid";
import HeaderRow from "./HeaderRow";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

export class Teams extends Component {
    static displayName = Teams.name;

    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            user: null,
            userRole: null,
            users: [],
            unassignedUsers: [],
            suspensionTeam: [],
            chassisTeam: [],
            engineTeam: [],
            controlsTeam: [],
            addFormData: {
                firstName: "",
                lastName: "",
                email: "",
                team: "",
                role: "",
            },
            editFormData: {
                googleId: null,
                firstName: "",
                lastName: "",
                email: "",
                team: "",
                role: "",
                status: "",
                createdDate: null,
                updatedDate: null
            }

        };
        this.clickAccordion = this.clickAccordion.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
        this.handleAddFormChange = this.handleAddFormChange.bind(this);
        this.handleEditFormChange = this.handleEditFormChange.bind(this);
        this.handleAddFormSubmit = this.handleAddFormSubmit.bind(this);
        this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    //get the users function
    async fetchUsers() {
        /*        const result = await fetch(`/api/account/get-users`, {
                    method: "Get",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
        */

        fetch(`/api/account/get-users`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({ users: data });

                const controls = data.filter(u => u.team === 'Controls');

                this.setState({ unassignedUsers: data.filter(u => u.team === 'Unassigned') });
                this.setState({ suspensionTeam: data.filter(u => u.team === 'Suspension') });
                this.setState({ chassisTeam: data.filter(u => u.team === 'Chassis') });
                this.setState({ engineTeam: data.filter(u => u.team === 'Engine') });
                this.setState({ controlsTeam: data.filter(u => u.team === 'Controls') });

            });
    }

    async updateUsers(contact) {
        console.log(JSON.stringify(contact));
        fetch(`/api/account/update-user`, {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("Users was updated");
                this.fetchUsers();
                console.log(this.state.controlsTeam);
            });
    }

    async deleteUser(contact) {
        console.log(JSON.stringify(contact));
        fetch(`/api/account/delete-user`, {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log("deleted user");
                this.fetchUsers();
            });
    }

    clickAccordion() {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }
    }

    handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...this.addFormData };
        newFormData[fieldName] = fieldValue;

        this.setState({ addFormData: newFormData });
    };

    handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...this.state.editFormData };
        newFormData[fieldName] = fieldValue;

        this.setState({ editFormData: newFormData });
    };

    handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newContact = {
            id: nanoid(),
            fullName: this.addFormData.fullName,
            address: this.addFormData.address,
            phoneNumber: this.addFormData.phoneNumber,
            email: this.addFormData.email,
        };

        const newContacts = [...this.users, newContact];
        this.setState({ users: newContacts });
    };

    // This is handling the save button even though it's not attached to it. Instead, it's attached to the form itself within this file. 
    handleEditFormSubmit = (event) => {
        event.preventDefault();

        let index = this.state.users.findIndex((contact) => contact.googleId === this.state.editContactId);

        let editedContact = {
            //id: this.state.editContactId,
            googleId: this.state.users[index].googleId,
            team: this.state.editFormData.team,
            role: this.state.editFormData.role,
            status: "Active",
            updatedDate: this.state.users[index].updatedDate
        };

        this.setState({ editContactId: null });

        //send editedContact to the update-user route 
        this.updateUsers(editedContact);


    };

    handleEditClick = (event, contact) => {
        event.preventDefault();
        this.setState({ editContactId: contact.googleId });
        //setEditContactId(contact._id);

        console.log("ContactId from handle edit click");
        console.log(JSON.stringify(contact._id));

        const formValues = {
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            team: contact.team,
            role: contact.role,
        };

        this.setState({ editFormData: formValues })
        //setEditFormData(formValues);
    };

    handleCancelClick = () => {
        this.setState({ editContactId: null });
        //setEditContactId(null);
    };

    handleDeleteClick = (contactId) => {

        const index = this.state.users.findIndex((contact) => contact.googleId === contactId);

        this.deleteUser(this.state.users[index]);
    };

    componentDidMount() {
        this.populateState();
        this.clickAccordion();
        this.fetchUsers();
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            user,
            userRole: user.role
        });

        /*this.setState({
            userRole: this.state.user.role
        });*/
    }

    componentWillMount() {
        /*this.clickAccordion();*/
        //console.log("Should have mounted clickAccordion");
    }

    /*render() {
        const { isAuthenticated, user } = this.state;

        if (!isAuthenticated) {
            return this.anonymousView();
        } else {
            return this.authenticatedView(user);
        }

    } authenticatedView(user) {
        return (
               
        );
    }

    anonymousView() {
        return (
            <h1 className="not-authorized">You are not authorized to view this page</h1>
        )
    }
}*/

    render() {
        return (
            <div className="userWrap">

                <button class="accordion">Pending</button>
                <div class="panel">
                    <form onSubmit={this.handleEditFormSubmit}>
                        <table>
                            <thead>
                                <HeaderRow userRole={this.state.userRole} />
                            </thead>
                            <tbody>
                                {this.state.unassignedUsers.length != 0 ? (
                                    this.state.unassignedUsers.map((contact) => (
                                        <Fragment>
                                            {this.state.editContactId === contact.googleId ? (
                                                <EditableRow
                                                    contact={contact}
                                                    editFormData={this.state.editFormData}
                                                    handleEditFormChange={this.handleEditFormChange}
                                                    handleCancelClick={this.handleCancelClick}
                                                    userRole={this.state.userRole}
                                                />
                                            ) : (
                                                <ReadOnlyRow
                                                    contact={contact}
                                                    handleEditClick={this.handleEditClick}
                                                    handleDeleteClick={this.handleDeleteClick}
                                                    userRole={this.state.userRole}
                                                />
                                            )}
                                        </Fragment>
                                    ))
                                ) : (
                                    <h2>No users found</h2>
                                )}
                                {/* ))} */}
                            </tbody>
                        </table>
                    </form>
                </div>

                <button class="accordion">Suspension</button>
                <div class="panel">
                    <form onSubmit={this.handleEditFormSubmit}>
                        <table>
                            <thead>
                                <HeaderRow userRole={this.state.userRole} />
                            </thead>
                            <tbody>
                                {this.state.suspensionTeam.length != 0 ? (
                                    this.state.suspensionTeam.map((contact) => (
                                        <Fragment>
                                            {this.state.editContactId === contact.googleId ? (
                                                <EditableRow
                                                    contact={contact}
                                                    editFormData={this.state.editFormData}
                                                    handleEditFormChange={this.handleEditFormChange}
                                                    handleCancelClick={this.handleCancelClick}
                                                    userRole={this.state.userRole}
                                                />
                                            ) : (
                                                <ReadOnlyRow
                                                    contact={contact}
                                                    handleEditClick={this.handleEditClick}
                                                    handleDeleteClick={this.handleDeleteClick}
                                                    userRole={this.state.userRole}
                                                />
                                            )}
                                        </Fragment>
                                    ))
                                ) : (
                                    <h2>No users found</h2>
                                )}
                                {/* ))} */}
                            </tbody>
                        </table>
                    </form>
                </div>

                <button class="accordion">Chasis</button>
                <div class="panel">
                    <form onSubmit={this.handleEditFormSubmit}>
                        <table>
                            <thead>
                                <HeaderRow userRole={this.state.userRole} />
                            </thead>
                            <tbody>
                                {this.state.chassisTeam.length != 0 ? (
                                    this.state.chassisTeam.map((contact) => (
                                        <Fragment>
                                            {this.state.editContactId === contact.googleId ? (
                                                <EditableRow
                                                    contact={contact}
                                                    editFormData={this.state.editFormData}
                                                    handleEditFormChange={this.handleEditFormChange}
                                                    handleCancelClick={this.handleCancelClick}
                                                    userRole={this.state.userRole}
                                                />
                                            ) : (
                                                <ReadOnlyRow
                                                    contact={contact}
                                                    handleEditClick={this.handleEditClick}
                                                    handleDeleteClick={this.handleDeleteClick}
                                                    userRole={this.state.userRole}
                                                />
                                            )}
                                        </Fragment>
                                    ))
                                ) : (
                                    <h2>No users found</h2>
                                )}
                                {/* ))} */}
                            </tbody>
                        </table>
                    </form>
                </div>

                <button class="accordion">Engine</button>
                <div class="panel">
                    <form onSubmit={this.handleEditFormSubmit}>
                        <table>
                            <thead>
                                <HeaderRow userRole={this.state.userRole} />
                            </thead>
                            <tbody>
                                {this.state.engineTeam.length != 0 ? (
                                    this.state.engineTeam.map((contact) => (
                                        <Fragment>
                                            {this.state.editContactId === contact.googleId ? (
                                                <EditableRow
                                                    contact={contact}
                                                    editFormData={this.state.editFormData}
                                                    handleEditFormChange={this.handleEditFormChange}
                                                    handleCancelClick={this.handleCancelClick}
                                                    userRole={this.state.userRole}
                                                />
                                            ) : (
                                                <ReadOnlyRow
                                                    contact={contact}
                                                    handleEditClick={this.handleEditClick}
                                                    handleDeleteClick={this.handleDeleteClick}
                                                    userRole={this.state.userRole}
                                                />
                                            )}
                                        </Fragment>
                                    ))
                                ) : (
                                    <h2>No users found</h2>
                                )}
                                {/* ))} */}
                            </tbody>
                        </table>
                    </form>
                </div>

                <button class="accordion">Controls</button>
                <div class="panel">
                    <form onSubmit={this.handleEditFormSubmit}>
                        <table>
                            <thead>
                                <HeaderRow userRole={this.state.userRole} />
                            </thead>
                            <tbody>
                                {this.state.controlsTeam.length != 0 ? (
                                    this.state.controlsTeam.map((contact) => (
                                        <Fragment>
                                            {this.state.editContactId === contact.googleId ? (
                                                <EditableRow
                                                    contact={contact}
                                                    editFormData={this.state.editFormData}
                                                    handleEditFormChange={this.handleEditFormChange}
                                                    handleCancelClick={this.handleCancelClick}
                                                    userRole={this.state.userRole}
                                                />
                                            ) : (
                                                <ReadOnlyRow
                                                    contact={contact}
                                                    handleEditClick={this.handleEditClick}
                                                    handleDeleteClick={this.handleDeleteClick}
                                                    userRole={this.state.userRole}
                                                />
                                            )}
                                        </Fragment>
                                    ))
                                ) : (
                                    <h2>No users found</h2>
                                )}
                                {/* ))} */}
                            </tbody>
                        </table>
                    </form>
                </div>

            </div>
        );
    }
}
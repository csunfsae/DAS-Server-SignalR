import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { nanoid } from "nanoid";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

class Teams extends Component {
    //static displayName = Teams.name;

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            userRole: this.props.userRole.role,
            users: [],
            addFormData: {
                firstName: "",
                lastName: "",
                email: "",
                team: "",
                role: "",
            },
            editFormData: {
                firstName: "",
                lastName: "",
                email: "",
                team: "",
                role: "",
            },
            editContactId: null
/*            users: [{
                firstName: 'Luis',
                lastName: 'Rangel',
                email: "ahsjh",
                role: 5,
                team: 6

            }]*/
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
        console.log(result);*/

        fetch(`/api/account/get-users`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("Users were fetched!");
                this.setState({users: data});
                console.log(this.state.users);
                console.log("The USER ROLE STATE fetched from redux inside TEAMS is: " + this.state.userRole);
            });
    }


    clickAccordion() {
        console.log("Testing button over console");
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
        this.setState({users: newContacts });
    };

    // This is handling the save button even though it's not attached to it. Instead, it's attached to the form itself within this file. 
    handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedContact = {
            id: this.state.editContactId,
            firstName: this.state.editFormData.firstName,
            lastName: this.state.editFormData.lastName,
            email: this.state.editFormData.email,
            team: this.state.editFormData.team,
            role: this.state.editFormData.role
        };

        const newContacts = [...this.state.users];

        const index = this.state.users.findIndex((contact) => contact._id === this.state.editContactId);

        newContacts[index] = editedContact;

      /*  setUsers(newContacts);
        setEditContactId(null);*/
        this.setState({ users: newContacts, editContactId: null });
    };

    handleEditClick = (event, contact) => {
        event.preventDefault();
        this.setState({ editContactId: contact._id });
        //setEditContactId(contact._id);

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
        const newContacts = [...this.state.users];

        const index = this.state.users.findIndex((contact) => contact._id === contactId);

        newContacts.splice(index, 1);

        this.setState({ users: newContacts });
        //setContacts(newContacts);
    };


    componentDidMount() {
        console.log("Mounted successfully!")
        this.clickAccordion();
        this.fetchUsers();
    }

    componentWillMount() {
        /*this.clickAccordion();*/
        console.log("Should have mounted clickAccordion");
    }

    componentWillReceiveProps(nextProps) {
        //console.log("SHOULD RERENDER DOM")
        this.setState({ users: nextProps });
    }

    render() {
        console.log("Testing when this mounts...")
        return (
            <div className="userWrap">

{/*                <button className="accordion">Section 1</button>
                <div class="panel">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </p>
                </div>*/}
                { console.log("checking users from dom") }
                { console.log(this.state.users) }

                <button class="accordion">Section 1</button>
                <div class="panel">
                    <form onSubmit={this.handleEditFormSubmit}>
                        <table>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Team</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users ? (
                                    this.state.users.map((contact) => (
                                        <Fragment>
                                            {this.state.editContactId === contact._id ? (
                                                <EditableRow
                                                    editFormData={this.state.editFormData}
                                                    handleEditFormChange={this.handleEditFormChange}
                                                    handleCancelClick={this.handleCancelClick}
                                                />
                                            ) : (
                                                <ReadOnlyRow
                                                    contact={contact}
                                                    handleEditClick={this.handleEditClick}
                                                    handleDeleteClick={this.handleDeleteClick}
                                                />
                                            )}
                                        </Fragment>
                                    ))
                                ) : (
                                    <h2>Users here</h2>
                                )}
                                {/* ))} */}
                            </tbody>
                        </table>
                    </form>
                </div>

                <button class="accordion">Section 2</button>
                <div class="panel">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </p>
                </div>

                <button class="accordion">Section 3</button>
                <div class="panel">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userRole: state.userRole
    }
}

export default connect(mapStateToProps)(Teams);

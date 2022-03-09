import React, { Component } from 'react';

export class Teams extends Component {
    static displayName = Teams.name;

    constructor() {
        super();
        // Don't call this.setState() here!
        this.state = {
            users: []
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
                this.state.users = data;
                //console.log(this.state.users);
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
                    <div className="list-users">
                        <div className="user-subheader">
                            <span>
                                <strong>Name</strong>
                            </span>
                            <span>
                                <strong>Email</strong>
                            </span>
                            <span>
                                <strong>Role</strong>
                            </span>
                            <span>
                                <strong>Team</strong>
                            </span>
                        </div>
                        {this.state.users ? (
                            this.state.users.map((user, index) => (
                                <div className="user" id={index}>
                                    <span>
                                        {user.firstName} {user.lastName}
                                    </span>
                                    <span>{ user.email }</span>
                                    <span>{ user.role }</span>
                                    <span>{ user.team }</span>
{/*                                    <button onClick={() => changeElement(index)}>Edit</button>
                                    <button onClick={() => removeUser(user)}>Delete</button>*/}
                                </div>
                            ))
                        ) : (
                            <h2>Users here</h2>
                        )}
                        {/* <p>END OF USERS LIST</p> */}
                    </div>
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
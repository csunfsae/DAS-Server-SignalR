import React, { Component } from 'react';
import authService from '../api-authorization/AuthorizeService';

export class Teams extends Component {
    static displayName = Teams.name;

    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            user: null
        };
        this.clickAccordion = this.clickAccordion.bind(this);
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
        this.populateState();
        console.log("Mounted successfully!")
        this.clickAccordion();
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            user
        });
    }

    componentWillMount() {
        /*this.clickAccordion();*/
        console.log("Should have mounted clickAccordion");
    }

    render() {
        const { isAuthenticated, user } = this.state;

        if (!isAuthenticated) {
            return this.anonymousView();
        } else {
            return this.authenticatedView(user);
        }

    } authenticatedView(user) {
        return (
            <>
                <p>{user.firstName}</p>
                <p>{user.lastName}</p>
                <p>{user.role}</p>
                <p>{user.team}</p>
                <p>{user.status}</p>
                <div className="userWrap">

                <button className="accordion">Section 1</button>
                <div class="panel">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </p>
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
            </div></>
        );
    }

    anonymousView() {
        return (
            <h1>You are not authorized to view this page</h1>
        )
    }
}
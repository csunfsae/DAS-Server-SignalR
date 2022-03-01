import React, { Component } from 'react';

export class Teams extends Component {
    static displayName = Teams.name;

    constructor() {
        super();
        // Don't call this.setState() here!
        this.state = {};
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
        console.log("Mounted successfully!")
        this.clickAccordion();
    }

    componentWillMount() {
        /*this.clickAccordion();*/
        console.log("Should have mounted clickAccordion");
    }

    render() {
        console.log("Testing when this mounts...")
        return (
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
            </div>
        );
    }
}
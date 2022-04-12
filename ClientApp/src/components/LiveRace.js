import React, { Component } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import authService from '../api-authorization/AuthorizeService';

export class LiveRace extends Component {   
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            speed: "0"
        };
    }

    static displayName = LiveRace.name;

    async display() {
        var connection = new HubConnectionBuilder();

        if (process.env.NODE_ENV === 'production') {
            connection = connection
                .withUrl("/racehub")
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build();
        } else {
            connection = connection
                .withUrl("https://localhost:7116/racehub")
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build();;
        }

        connection.on("Speedometer", data => {
            console.log(data);
            this.setState({ speed: data });
        });

        await connection.start();
    }

    componentDidMount() {
        this.populateState();
    }

    async populateState() {
        const [isAuthenticated] = await Promise.all([authService.isAuthenticated()])
        this.setState({
            isAuthenticated
        });
    }

    render() {
        const { isAuthenticated } = this.state;
        if (!isAuthenticated) {            
            return this.anonymousView();
        } else {            
            return this.authenticatedView();
        }
    }

    authenticatedView() {
        return (
            <div>
                <h1>Live Race</h1>

                <p>You are viewing a live race</p>

                <p aria-live="polite">Speedometer: <strong>{this.state.speed} mph</strong></p>
            </div>
        );
    }

    anonymousView() {
        return (
            <h1 className="not-authorized">You are not authorized to view this page</h1>
        )
    }
}
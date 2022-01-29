import React, { Component } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export class LiveRace extends Component {
    static displayName = LiveRace.name;


    constructor(props) {
        super(props);
        this.state = { speed: "0" };
    }

    componentDidMount() {
        this.display();
    }

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

    render() {
        return (
            <div>
                <h1>Live Race</h1>

                <p>You are viewing a live race</p>

                <p aria-live="polite">Speedometer: <strong>{this.state.speed} mph</strong></p>
            </div>
        );
    }
}
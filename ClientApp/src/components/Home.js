import React, { Component } from 'react';
import racecarImg from '../assets/racecar.svg';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="overlay">
                <h1>CSUN Data Aquisition System</h1>
                <img id="carImg" src={racecarImg} alt="racecar img" />
            </div>
        );
    }
}

import React, { Component } from 'react';
import racecarImg from '../assets/racecar.svg';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="overlay">
                <div class="row justify-content-around">
                    <div class="col-4">
                        <h1 class="home-title">Data Acquisition System customized for CSUN FSAE</h1>
                        {/*<br></br><br></br>*/}
                        <hr style={{width: '50px'}}></hr>
                        <p class="text-dark" style={{ fontSize: '24px' }}>Check data from one of our vehicles in real time.</p>
                        <div class="home-buttons">
                            <button
                                class="btn btn-dark btn-lg"
                                style={{ width: '150px', margin: '0 20px 0 0' }}>Get Started</button>
                            <button
                                class="btn btn-lg"
                                style={{ width: '150px', margin: '0 20px 0 0' }}
                                >Watch Video</button>
                        </div>

                    </div>
                    <div class="col-7">
                        {/*<h1>CSUN Data Aquisition System</h1>*/}
                        <img id="carImg" src={racecarImg} alt="racecar img" />
                    </div>
                </div>
            </div>
        );
    }
}

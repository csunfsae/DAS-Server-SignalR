import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { LiveRace } from './components/LiveRace';
import { RegistrationPage } from './components/RegistrationPage';
import { Teams } from './components/Teams';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/live-race' component={LiveRace} />
            <Route exact path='/register' component={RegistrationPage} />
            <Route exact path='/teams' component={Teams} />
      </Layout>
    );
  }
}

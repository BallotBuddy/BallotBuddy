import _ from 'lodash'; // <= DO WE  NEED THIS?
import React, { Component } from 'react';
import LandingPage from '../components/landing_page';

// Main componnent
export default class App extends Component {
  render() {
    return (
      <div className="app">
        {this.props.children}
      </div>
    );
  }
}

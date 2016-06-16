import _ from "lodash";
import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import ProfilesList from '../containers/profiles_list';

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

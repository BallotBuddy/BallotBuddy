import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import ProfilesList from '../containers/profiles_list';

export default class App extends Component {
  render() {
    return (
      <div>
      	<div>BallotBuddy</div>
	      <SearchBar />
        <ProfilesList />
      </div>
    );
  }
}

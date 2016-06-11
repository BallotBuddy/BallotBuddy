import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
// import CandidateProfile from '../containers/profile_list';

export default class App extends Component {
  render() {
    return (
      <div>
      	<div>React simple starter</div>
	      <SearchBar />
      </div>
    );
  }
}

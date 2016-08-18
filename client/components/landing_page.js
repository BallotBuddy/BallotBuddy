import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfilesList from '../containers/profiles_list';
import SearchBar from '../containers/search_bar';

// This component controls the rendering for either the search function
// or the results to be displayed following the search
class LandingPage extends Component {

  render() {
    return (
      <div>
        {this.props.search ? <SearchBar /> : null }
        {this.props.list ? <ProfilesList /> : null }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    list: state.landing.list,
    search: state.landing.search
  }
}

export default connect(mapStateToProps)(LandingPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProfilesList from '../containers/profiles_list';
import SearchBar from '../containers/search_bar';

class LandingPage extends Component {

  constructor(props) {
    super(props);
  }

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
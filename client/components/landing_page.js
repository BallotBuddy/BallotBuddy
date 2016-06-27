import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { showSearch, showList } from '../actions/index';
import ProfilesList from '../containers/profiles_list';
import SearchBar from '../containers/search_bar';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('LandingPage is rendering...');
    return (
      <div>
        <div>
          {this.props.search ? <SearchBar /> : null }
        </div>
        <div>
          {this.props.list ? <ProfilesList /> : null }
        </div>
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
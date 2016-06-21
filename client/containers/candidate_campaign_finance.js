import React, { Component } from 'react';
import connect from 'react-redux';
import { fetchCandidateIndustryContributors } from '../actions/index';

export default class CandidateCampaignFinance extends Component(){
  
  componentWillMount(){

  }

  render(){
    return (
      <div>{this.props.contributors}</div>
    );
  }
}

// function mapStateToProps( state ) {
//   contributors = state.profiles.contributors
// }

// export default connect(mapStateToProps, { fetchCandidateIndustryContributors })(CandidateCampaignFinance);

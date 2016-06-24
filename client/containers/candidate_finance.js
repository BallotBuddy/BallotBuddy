import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidateIndustryContributors } from '../actions/index';


class CandidateFinance extends Component {

  componentWillMount() {
    this.props.fetchCandidateIndustryContributors(this.props.id);
  }

  renderCandidateFinance(){
    return this.props.contributors.map((donor) => {
      const industry = donor.industry_name;
      const indivs = donor.indivs;
      const pacs = donor.pacs;
      const total = donor.total;
      return (
        <div className="donor-tile" key={donor.industry_code}>
          <div className="donor-industry">
            {industry}
          </div>
          <div className="donor-type">
            <div className="type">Individual</div>
            <div className="type">Political Action Committee</div>
            <div className="type">Total</div>
          </div>
          <div className="donation-amounts">
            <div className="amount">{indivs}</div>
            <div className="amount">{pacs}</div>
            <div className="total-amount">{total}</div>
          </div>
        )
      });
    }

    render(){
      const { contributors } = this.props;
      return (
        <div className='candidate-finance-container'>
          Top Campaign Contributors
          <div className="candidate-finance-title">{this.renderCandidateFinance()}</div>
        </div>
      );
    }
  }

  function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchCandidateIndustryContributors }, dispatch);
  }
}

function mapStateToProps(state){
  return {
    contributors: state.profiles.contributors
  }

export default connect(mapStateToProps, { fetchCandidateIndustryContributors })(CandidateFinance);

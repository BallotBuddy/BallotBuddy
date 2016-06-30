import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidateSectorFunding } from '../actions/index';

class CandidateFinance extends Component {

  componentWillMount() {
    this.props.fetchCandidateSectorFunding(this.props.id);
  }

  renderCandidateFinance(){
    if(this.props.sectorFunding === undefined) { return <div> Loading... </div> }

    // Build an array of the top 5 sectors by funding amount
    const topFundingSectors = this.props.sectorFunding.sort((a, b) => { return b.funding - a.funding }).slice(0,5);

    // Build a box for each sector, displaying funding total
    return topFundingSectors.map((sectorObj) => {
      const sector = sectorObj.sector;
      const funding = sectorObj.funding;
      return (
        <div className="donor-tile" key={sector}>
          <div className="donor-sector">
            {sector}
          </div>
          <div className="donation-amounts">
            {/* Note: the logic formats the number (e.g. 1000000 --> $1,000,000) */}
            <div className="total-amount">{"$"+funding.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
          </div>
        </div>
      )
    });
  }

  render(){
    const { sectorFunding } = this.props;
    return (
      <div className='candidate-finance-container'>
        <div className='candidate-finance-title'>Top 5 Campaign Finance Contributors</div>
        <p className='finance-disclaimer'>(by sector)</p>
        <div className='candidate-finance-line'></div>
        <div className="candidate-finance-tiles">{this.renderCandidateFinance()}</div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    sectorFunding: state.profiles.sectorFunding
  }
}

export default connect(mapStateToProps, { fetchCandidateSectorFunding })(CandidateFinance);

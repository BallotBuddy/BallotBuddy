import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidateSectorFunding } from '../actions/index';

class CandidateFinance extends Component {

  componentWillMount() {
    this.props.fetchCandidateSectorFunding(this.props.id);
  }

  renderCandidateFinance(){
    // Build an array of the top 5 sectors by funding amount
    if(this.props.sectorFunding === undefined) { return <div> Loading... </div> }
    console.log("Sector funding array is: ", this.props.sectorFunding);
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
<<<<<<< 8872febe0d9c4aab5f544d5361846ec13a1e7c96
        <div className='candidate-finance-title'>Top Campaign Contributors</div>
        <div className='candidate-finance-line'></div>
=======
        Top 5 Campaign Financing Sectors
>>>>>>> Refactors candidate_finance container to show sector level funding
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

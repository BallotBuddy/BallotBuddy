import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVoteSmartBio, clearVoteSmartBio, fetchCandidate } from '../actions/index';
import { Link } from 'react-router';
import CandidateExperience from './candidate_experience';
import CandidateFinance from '../containers/candidate_finance';
import CandidateVideo from './candidate_video';
import CandidateCourage from '../containers/candidate_courage';
import Twitter from '../containers/twitter';
import Loader from '../components/loader';

class DetailedProfile extends Component {

  constructor(props){
    super(props)

    this.backButtonClick = this.backButtonClick.bind(this);
  }

  componentWillMount(){
    this.props.fetchVoteSmartBio(this.props.params.cid);
  }

  backButtonClick(){
    this.props.clearVoteSmartBio();
  }

  renderSingleProfile(){
    const { voteSmartBio } = this.props;
    const bio = voteSmartBio.candidate;
    const election = voteSmartBio.election;
    const name = bio.firstName + ' ' + bio.lastName;
    const state = bio.homeState;
    const candidacy = election.status + ' candidate for ' + election.office;
    const rep = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/2000px-Republicanlogo.svg.png';
    const dem = 'http://d3n8a8pro7vhmx.cloudfront.net/dplac/sites/1/meta_images/original/dem-donkey-right-copy.png?1413244000';
    const ind = 'http://www.bartleboglehegarty.com/london/wp-content/themes/bbh/img/sheep-9.png';
    const lib = 'https://qph.is.quoracdn.net/main-qimg-a4c6d6da0a974033606804c7f42c1355?convert_to_webp=true';
    const green = 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/Green_Party_of_England_and_Wales_logo.svg/974px-Green_Party_of_England_and_Wales_logo.svg.png';
    const none = 'http://www.uk-road-signs.com/wp-content/uploads/2014/09/No-Parking.jpg';
    const pic = bio.photo;
    let logo = '';
    switch (election.parties[0]) {
      case 'R':
        logo = rep;
        break;
      case 'D':
        logo = dem;
        break;
      case 'I':
        logo = ind;
        break;
      case 'L':
        logo = lib;
        break;
      case 'G':
        logo = green;
        break;
      case 'N':
        logo = none;
        break;
      default:
       return logo = none;
    }
    return (
      <div className="single-profile-info">
        <div className="single-pic-box">
          <img className="single-pic" src={pic} />
        </div>
        <div className="single-profile-text">
          <div className="info-name">{name}</div>
          <div className="info-name-line"></div>
          <div className="info-candidacy">{candidacy}</div>
        </div>
        <div className="info-party">
          <img className="info-party-logo" src={logo} />
        </div>
      </div>
    );
  }

//data.payload.data['0'].twitter_id;
  render() {
    const { voteSmartBio } = this.props;
    if (!voteSmartBio){
      return <Loader />
    }
    return (
      <div className="detailed-profile">
        <div className="result-header">
          <Link className='back-link' to="/" style={[ { float: 'left' } ]}>
            <div className="go-back-button" onClick={() => {this.backButtonClick()}}>back</div>
          </Link>
          <div className="result-header-logo">
            BallotBuddy
            <img className="results-header-pic" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAADEElEQVR4Xu2b4VHDMAxG5Q3YBNgANoEJGAk2gQ0om7CBOXPOXShNa/mTrdT++AmRnLwnuXZqgvDHlUBwHZ2DCwU4FwEFUIAzAefh2QEU4EzAeXh2AAU4E3Aenh1AAc4EnIdnB1ybgBhjdL7nvQ7/JSIPIYRvzQ2qO4ACTuKtgp8yUYCmXE9fWw2fApzhUwAmAKr8ZWhOQXUSTOCbdkAIQS2z7tnHilJD21oFUUBdYVBAHTezKAowQBljvNFuwMw/hGedghJ8EXkXkUMI4Vnrkx2gJba6fgX/Lv/6TSuBAioFnIC/ZFJJoIAKAWfgqyVQgFJAAfyUsXijRgEKAdbwuRN2hk8BhQJaVD73ATuAzw64IKFl5bMDdgCfHbAhoUflswN2AJ8dcCShZ+WzAxrAr3ktzZ2wiFhU/pIjhHBfuML9vWx6AZbwReRO+73I1AKs4f9WtPJwwrQCWsCngMLJtxV8CigQYAE/DRNj/Exz/vGQVzsFxRifRORFRB5rTxhc4m8FPws4eUz/KgVk+K8Z4KGFBEv4Qwk4gr8UsakEa/jDCNiAbyqhBfyRBKRKvz0zd0Od0Ar+SALSqbKPFhJawh9GQH4Qcwmt4Q8lwFpCD/jDCbCS0Av+kAJQCT3hDyugVkJv+EML0ErIS9h0Pv/fe5nV8rb4rOal1xnL363+VWu3r6NzVZcsUROTrvCH74BVlZUsUc8VrXnlT9MBBhKawZ+mAwAJTeFPJ0DxwZwubQ5/SgGFErrAn1bABQnd4E8tYENCV/jTC1hJeMsf1E+tvkfeWuMOvxEr3ZF6XUcBXuTzuBRAAX8JaM/DOPODh2cHwAixBBSA8YOjKQBGiCWgAIwfHE0BMEIsAQVg/OBoCoARYgkoAOMHR1MAjBBLQAEYPzh6dwLgJxokgfaVjNm5oEH4wY9BATBCLAEFYPzgaAqAEWIJKADjB0c3FwDfIRP8IaBeBZGfLQEKsOWpzkYBamS2ARRgy1OdjQLUyGwDKMCWpzobBaiR2QZQgC1PdTYKUCOzDaAAW57qbBSgRmYb8AM4sBOOunHPOgAAAABJRU5ErkJggg=="/>
          </div>
        </div>
        <div className="detailed-profile-components">
          {this.renderSingleProfile()}
          <div className="social-media">
            <Twitter candId = { voteSmartBio.candidate.candidateId } />
            <CandidateVideo candInfo = {voteSmartBio.election}
                            ballotName={voteSmartBio.election.ballotName}
                            office={voteSmartBio.election.office}/>
          </div>
          <CandidateFinance id={voteSmartBio.candidate.crpId} />
          <CandidateExperience candInfo={voteSmartBio.candidate} />
          <CandidateCourage id={voteSmartBio.candidate.candidateId} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    voteSmartBio: state.profiles.voteSmartBio,
    singleProfile: state.profiles.singleProfile
  };
}

export default connect(mapStateToProps, { fetchVoteSmartBio, clearVoteSmartBio, fetchCandidate } )(DetailedProfile);

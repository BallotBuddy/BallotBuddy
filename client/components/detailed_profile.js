import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVoteSmartBio, clearVoteSmartBio, fetchCandidate } from '../actions/index';
import { Link } from 'react-router';
import CandidateExperience from './candidate_experience';
import CandidateFinance from '../containers/candidate_finance';
import CandidateVideo from './candidate_video';
import CandidateCourage from '../containers/candidate_courage';
import Twitter from '../containers/twitter';

class DetailedProfile extends Component {

  componentWillMount(){
<<<<<<< 63fdea70f9717cb3b7aed7604670f44080e56601
    this.props.fetchVoteSmartBio(this.props.params.cid);
=======
    this.props.fetchVoteSmartBio(this.props.params.cid)
      .then( (data)=> { console.log(data);
        this.props.fetchCandidateIndustryContributors(data.payload.data.candidate.crpId)
        .then( (data) => { 
          this.props.fetchCandidate(27097)
        })
      });
>>>>>>> got singleProfile to hold candidate information including youtube id and youtube links
  }

  renderSingleProfile(){
    const { voteSmartBio } = this.props;
    const bio = voteSmartBio.candidate;
    const election = voteSmartBio.election;
    const name = election.ballotName;
    const rep = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/2000px-Republicanlogo.svg.png';
    const dem = 'http://d3n8a8pro7vhmx.cloudfront.net/dplac/sites/1/meta_images/original/dem-donkey-right-copy.png?1413244000';
    const ind = 'http://www.bartleboglehegarty.com/london/wp-content/themes/bbh/img/sheep-9.png';
    const lib = 'https://qph.is.quoracdn.net/main-qimg-a4c6d6da0a974033606804c7f42c1355?convert_to_webp=true';
    const green = 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/Green_Party_of_England_and_Wales_logo.svg/974px-Green_Party_of_England_and_Wales_logo.svg.png';
    const none = 'http://www.uk-road-signs.com/wp-content/uploads/2014/09/No-Parking.jpg';
    const pic = bio.photo;
    let logo = '';
    if (election.parties[0] === 'R') {
      logo = rep;
    }
    if (election.parties[0] === 'D') {
      logo = dem;
    }
    if (election.parties[0] === 'I') {
      logo = ind;
    }
    if (election.parties[0] === 'L') {
      logo = lib;
    }
    if (election.parties[0] === 'G') {
      logo = green;
    }
    if (election.parties[0] === 'N') {
      logo = none;
    }
    return (
      <div className="single-profile">
        <div className="single-profile-header">
          <img className="single-logo" src={logo} />
          <Link onClick = {()=>{this.props.clearVoteSmartBio()}}to="/" className="back-button">Back to search results</Link>
          <div className="detail-color-bar"></div>
        </div>
          <div className="single-profile-info">
          <img className="single-pic" src={pic} />
          <div className="info">
            <div>
              <h2>{name}</h2>
            </div>
            <div>
              <h4>{bio.homeState}</h4>
            </div>
            <div>
            <CandidateVideo candInfo = {voteSmartBio.election}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
//data.payload.data['0'].twitter_id;
  render() {
    const { singleProfile } = this.props;
    const tweetId = singleProfile;
    console.log("render in detaile_profile is firing!! this is the tweetId:", tweetId )
    const { voteSmartBio } = this.props;
    if (!voteSmartBio){
      return <div>Loading...</div>;
    }
    return (
      <div>
        {this.renderSingleProfile()}
        <div className="candidate-components">
          <CandidateExperience candInfo={voteSmartBio.candidate} />
          <CandidateFinance id={voteSmartBio.candidate.crpId} />
          <CandidateCourage id={voteSmartBio.candidate.candidateId} />
          <CandidateFinance financeInfo={ contributors } />
          <Twitter twitterId = { tweetId } />
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


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchVoteSmartBio } from '../actions/index';
import { Link } from 'react-router';

class DetailedProfile extends Component {

  componentWillMount(){
    // this.props.fetchCandidate(this.props.params.cid);
    console.log('component will mount is firing!!!');
    this.props.fetchVoteSmartBio(this.props.params.cid);
  }

  renderSingleProfile(){
    // const { singleProfile } = this.props;
    const { voteSmartBio } = this.props;
    console.log('voteSmartBio in DetailedProfile: ', this.props.voteSmartBio);
    const bio = voteSmartBio.candidate;
    const election = voteSmartBio.election;
    console.log('bio :', bio);
    console.log('election :', election);
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
          <Link to="/" className="back-button">Back to search results</Link>
          <div className="detail-color-bar"></div>
        </div>
          <div className="single-profile-info">
            <img className="single-pic" src={pic} />
            <h3>{name}</h3>
            <h4>{bio.political}</h4>
            <h4>{bio.religion}</h4>
        </div>
      </div>
    );
  }

  render() {
    const { voteSmartBio } = this.props;
    if (!voteSmartBio){
      return <div>Loading...</div>;
    }
    return (
      <div>{this.renderSingleProfile()}</div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    // singleProfile: state.profiles.singleProfile,
    voteSmartBio: state.profiles.voteSmartBio
  };
}

export default connect(mapStateToProps, { fetchVoteSmartBio })(DetailedProfile);

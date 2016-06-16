import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidate } from '../actions/index';
import { Link } from 'react-router';

class DetailedProfile extends Component {

  componentWillMount(){
    this.props.fetchCandidate(this.props.params.cid);
  }

  renderSingleProfile(){
    const { singleProfile } = this.props;
    const rep = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/2000px-Republicanlogo.svg.png';
    const dem = 'http://d3n8a8pro7vhmx.cloudfront.net/dplac/sites/1/meta_images/original/dem-donkey-right-copy.png?1413244000';
    const ind = 'http://www.bartleboglehegarty.com/london/wp-content/themes/bbh/img/sheep-9.png';
    const pic = singleProfile.picture;
    let logo = '';
    if (singleProfile.party === 'R') {
      logo = rep;
    }
    if (singleProfile.party === 'D') {
      logo = dem;
    }
    if (singleProfile.party === 'I') {
      logo = ind;
    }
    return (
      <div className="single-profile">
        <div className="single-profile-header">
          <img className="single-logo" src={logo} />
          <Link to="/" className="btn btn-danger">Back to search results</Link>
          <img className="single-pic" src={pic} />
        </div>
          <div className="single-profile-info">
            <h3>{singleProfile.candidate_firstlast}</h3>
            <h4>{singleProfile.twitter_id}</h4>
            <h4>{singleProfile.webform}</h4>
            <h4>{singleProfile.website}</h4>
        </div>
      </div>
    );
  }

  render() {
    const { singleProfile } = this.props;
    if (!singleProfile){
      return <div>Loading...</div>;
    }
    return (
      <div>{this.renderSingleProfile()}</div>
    );
  }
}

function mapStateToProps(state) {
  return { singleProfile: state.profiles.singleProfile };
}

export default connect(mapStateToProps, { fetchCandidate })(DetailedProfile);

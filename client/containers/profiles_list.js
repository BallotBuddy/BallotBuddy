import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileList extends Component {
  
  // builds the individual candidate tile (photo + name + party)
  renderProfile(profileData){
    let logo = '';
    const name = profileData.candidate_firstlast;
    const picture = profileData.picture;
    const rep = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/2000px-Republicanlogo.svg.png';
    const dem = 'http://d3n8a8pro7vhmx.cloudfront.net/dplac/sites/1/meta_images/original/dem-donkey-right-copy.png?1413244000';
    const state = profileData.state;
    const title = profileData.office[2] === 'S' ? 'Sen.' : 'Rep.';
    const partyStyle = {};
    if (profileData.party === 'R') {
      partyStyle['backgroundColor'] = 'rgba(141,0,36, .8)';
      logo = rep;
    }
    if (profileData.party === 'D') {
      partyStyle['backgroundColor'] = 'rgba(0,32,70, .8)';
      logo = dem;
    }

    return (
      <div className="profile-tile" key={profileData.candidate_id}>
        <div>
          <img className="profile-picture" src={picture} />
        </div>
        <div className="tile-detail" style={partyStyle}>
          <div className="candidate-name">{name}</div>
          <div className="candidate-affiliation">
            <img className="party-logo" src={logo} />
            {title} {state}
          </div>
        </div>
      </div>
    );
  }

  // displays all candidates meeting search criteria
  render() {
    return(
      <div>
         {this.props.profile.map(this.renderProfile)}
      </div>
    );
  }
}

function mapStateToProps( state ){
  const profile = state.profile;
  return { profile: state.profile };
}

export default connect(mapStateToProps)(ProfileList);

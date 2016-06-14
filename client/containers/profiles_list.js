import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileList extends Component {
  
  // builds the individual candidate tile (photo + name + party)
  renderProfile(profileData){
    const name = profileData.candidate_firstlast;
    const picture = profileData.picture;
    const affiliation = profileData.party + ', ' + profileData.office.slice(0, 2);
    let divStyles = {
      backgroundImage: 'url(' + picture + ')'
    };

    return (
      <div className="profile-tile" key={profileData.candidate_id}>
        <div className="profile-tile-image" style={divStyles} >
        </div>
        <div className="tile-detail">
          {name} {affiliation}
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

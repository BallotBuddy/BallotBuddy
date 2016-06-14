import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ProfileTile from '../components/profile_tile';

class ProfileList extends Component {
  
  renderProfile(profileData){
    console.log('renderProfile is firiing: ', profileData);
    const name = profileData.firstlast;
    const photo = profileData.photo;
    const affiliation = profileData.party + ', ' + profileData.office.slice(0, 2);
    let divStyles = {
      backgroundImage: 'url(' + photo + ')'
    };
    
    return (
      <div className="profile-tile" key={profileData.cid}>
        <div className="profile-tile-image" style={divStyles} >
        </div>
        <div className="tile-detail">
          {name} {affiliation}
        </div>
      </div>
    );
  }

  render() {
    console.log('this.props.profile in profiles_list :', this.props.profile);
    return(
      <div>
         {this.props.profile.map(this.renderProfile)}
      </div>
    );
  }
}

function mapStateToProps( state ){
  const profile = state.profile;
  console.log('profiles_list.js - mapStateToProps fired', { profile });
  return { profile: state.profile };
}

export default connect(mapStateToProps)(ProfileList);
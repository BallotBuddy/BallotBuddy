import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ProfileList extends Component {
  
  // builds the individual candidate tile (photo + name + party)
  renderProfile(){
    // return this.props.profiles.map((profile) => {
    console.log('LOG 7 profiles_list: renderProfile data:', this.props.zipResponse);
    return this.props.zipResponse.map((profile) => {
      let logo = '';
      const name = profile.firstName + " " + profile.lastName;
      const picture = profile.picture;
      const rep = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/2000px-Republicanlogo.svg.png';
      const dem = 'http://d3n8a8pro7vhmx.cloudfront.net/dplac/sites/1/meta_images/original/dem-donkey-right-copy.png?1413244000';
      const ind = 'http://www.bartleboglehegarty.com/london/wp-content/themes/bbh/img/sheep-9.png';
      const currentOffice = profile.officeName;
      const party = profile.electionParties;
      let state = profile.officeStateId;
      const id = profile.candidateId;
      const runningIn = profile.electionStateId;
      let selectOffice = function(electionOffice) {
        switch(electionOffice) {
          case "President":
            return "U.S. Presidential Candidate"
            break;
          case "U.S. House":
            return "U.S. Congressional Candidate"
            break;
          case "U.S. Senate":
            return "U.S. Senate Candidate"
            break;
          case "State House":
            return "State Congressional Candidate"
            break;
          case "State Senate":
            return "State Senatorial Candidate"
            break;
          default:
            return "Not Listed";
        }
      }
      let partyStyle = {};
            // let imageStyle = {
      //   backgroundImage:`url(${picture})`,
      //   backgroundImageSize: 'cover',
      //   backgroundImageRepeat: 'no-repeat',
      //   backgroundImagePosition: '50% 50%'
      // }
      if ( party === 'Republican' ) {
        partyStyle['borderColor'] = 'rgb(222,1,0)';
        logo = rep;
      } else
      if (party === 'Democratic') {
        partyStyle['borderColor'] = 'rgb(33,18,192)';
        logo = dem;
      } else
      if (party === 'Independent') {
        partyStyle['borderColor'] = 'rgb(216,164,3)';
        logo = ind;
      }
      return (
        <div className={`profile-tile profile-tile-${party}`} key={profile.candidateId} style={partyStyle}>
          <div className="profile-picture-box">
            <img className="profile-picture" src={picture} />
          </div>
          <div className="profile-tile-detail">
            <div className="candidate-name">{name}</div>
            <div className="election-office">{ selectOffice(profile.electionOffice) }</div>
            <div className="party-logo-box">
              <img className="party-logo"src={logo} />
            </div>
          </div>
        </div>
      );
    });
  }

  // displays all candidates meeting search criteria
  render() {
    return(
      <div className="profile-tile-list">
        {this.renderProfile()}
      </div>
    );
  }
}

function mapStateToProps( state ){
  return { 
    profiles: state.profiles.profiles,
    zipResponse: state.profiles.zipResponse
  };
}

export default connect(mapStateToProps)(ProfileList);


import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ProfileList extends Component {
  
  // builds the individual candidate tile (photo + name + party)
  renderProfile(){
    // return this.props.profiles.map((profile) => {
    return this.props.zipResponse.map((profile) => {
      let logo = '';
      let state = profile.officeStateId;
      const name = profile.firstName + " " + profile.lastName;
      const picture = profile.picture;
      const rep = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/2000px-Republicanlogo.svg.png';
      const dem = 'http://d3n8a8pro7vhmx.cloudfront.net/dplac/sites/1/meta_images/original/dem-donkey-right-copy.png?1413244000';
      const ind = 'http://www.bartleboglehegarty.com/london/wp-content/themes/bbh/img/sheep-9.png';
      const lib = 'https://qph.is.quoracdn.net/main-qimg-a4c6d6da0a974033606804c7f42c1355?convert_to_webp=true';
      const green = 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/Green_Party_of_England_and_Wales_logo.svg/974px-Green_Party_of_England_and_Wales_logo.svg.png';
      const none = 'http://www.uk-road-signs.com/wp-content/uploads/2014/09/No-Parking.jpg';
      const currentOffice = profile.officeName;
      const party = profile.electionParties[0];
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
            return "Candidacy not Listed";
        }
      }
      let partyStyle = {};
      if ( party === 'R' ) {
        partyStyle['borderColor'] = 'rgb(222,1,0)';
        logo = rep;
      } else
      if (party === 'D') {
        partyStyle['borderColor'] = 'rgb(33,18,192)';
        logo = dem;
      } else
      if (party === 'I') {
        partyStyle['borderColor'] = 'rgb(216,164,3)';
        logo = ind;
      }
      if (party === 'L') {
        partyStyle['borderColor'] = 'rgb(213,182,0)';
        logo = lib;
      }
      if (party === 'G') {
        partyStyle['borderColor'] = 'rgb(23,170,92)';
        logo = green;
      }
      if (party === 'N') {
        logo = none;
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


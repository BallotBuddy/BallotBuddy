import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class ProfileList extends Component {
  
  // builds the individual candidate tile (photo + name + party)
  renderProfile(){
    // return this.props.profiles.map((profile) => {
    console.log('LOG 7: renderProfile in profiles_list.js data:', this.props.zipResponse);
    // return this.props.zipResponse.map((profile) => {
    //   let logo = '';
    //   const name = profile.ballotName;
    //   const picture = profile.picture;
    //   const rep = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/2000px-Republicanlogo.svg.png';
    //   const dem = 'http://d3n8a8pro7vhmx.cloudfront.net/dplac/sites/1/meta_images/original/dem-donkey-right-copy.png?1413244000';
    //   const ind = 'http://www.bartleboglehegarty.com/london/wp-content/themes/bbh/img/sheep-9.png';
    //   const currentOffice = profile.officeTypeId;
    //   const electionOffice = profile.electionOfficeTypeId;
    //   const title = profile.office[2] === 'S' ? 'Sen.' : 'Rep.';
    //   const partyStyle = {};
    //   const party = profile.electionParties.charAt(0);
    //   let state = officeStateId;
    //   let color = '';
    //   if (profile.officeStateId === '') {
    //     state = 'National';
    //   }
    //   if (profile.party === 'R') {
    //     partyStyle['borderColor'] = 'rgb(222,1,0)';
    //     logo = rep;
    //   }
    //   if (profile.party === 'D') {
    //     partyStyle['borderColor'] = 'rgb(33,18,192)';
    //     logo = dem;
    //   }
    //   if (profile.party === 'I') {
    //     partyStyle['borderColor'] = 'rgb(216,164,3)';
    //     logo = ind;
    //   }
    //   return (
    //     <div className={`profile-tile profile-tile-${party}`} key={profile.candidate_id}>
    //       <Link to={"profile/" + profile.candidate_id}>
    //         <div>
    //           <img className="profile-picture" src={picture} />
    //         </div>
    //         <div className="party-bar" style={partyStyle}></div>
    //         <div className="tile-detail">
    //           <div className="candidate-name" style={partyStyle}>{name}</div>
    //           <div className="candidate-affiliation">
    //             <img className="party-logo" src={logo} />
    //             {currentOffice} {state}
    //           </div>
    //         </div>
    //       </Link>
    //     </div>
    //   );
    // });
  }

  // displays all candidates meeting search criteria
  render() {
    return(
      <div>
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


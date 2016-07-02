import _ from 'lodash'; // <= DO WE  NEED THIS?
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { showSearch, clearProfiles } from '../actions/index';
import Loader from '../components/loader';

class ProfilesList extends Component {

  constructor(props) {
    super(props)

    this.backButtonClick = this.backButtonClick.bind(this);
  }

  backButtonClick() {
    this.props.clearProfiles();
    this.props.showSearch();
  }

  filterByDate(data){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();

    if(dd<10) {
      dd='0'+dd
    }

    if(mm<10) {
      mm='0'+mm
    }

    today = yyyy+'-'+mm+'-'+dd;
    let filteredData = [];

    for(var prop in data) {
        let obj = data[prop];
        let date = parseDate(obj.electionDate);
        let todayParsed = parseDate(today);

        //Filter dates from today moving forward or President...
        if (obj.electionOffice == 'President' || date > todayParsed){
          filteredData.push(obj);
        }
    }

    function parseDate(dateStr) {
        let date = dateStr.split('-');
        let day = date[2];
        let month = date[1] - 1; //January = 0
        let year = date[0];
        return new Date(year, month, day);
    }
    return filteredData;
  }

  // builds the individual candidate tile (photo + name + party)
  renderProfile(){
    return this.filterByDate(this.props.zipResponse).map((profile) => {
      let logo = '';
      let state = profile.officeStateId;
      const name = profile.firstName + ' ' + profile.lastName;
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
      const electionState = profile.electionStateId;
      let selectOffice = function(electionOffice) {
        switch(electionOffice) {
          case 'President':
            return 'U.S. Presidential Candidate'
          case 'U.S. House':
            return 'U.S. Congressional Candidate'
          case 'U.S. Senate':
            return 'U.S. Senatorial Candidate'
          case 'State House':
            return 'State Congressional Candidate'
          case 'State Senate':
            return 'State Senatorial Candidate'
          default:
            return `Candidate for: ${electionOffice}`;
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
        <Link className="profile-link" to={'profile/' + id}>
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
        </Link>
        </div>
      );
    });
  }

  // displays all candidates meeting search criteria
  render() {
    const { zipResponse } = this.props;
    if (!zipResponse) {
      return <Loader />
    }
    return(
      <div className="search-results">
        <div className="result-header">
          <div className="go-back-button" onClick={() => {this.backButtonClick()}}>back</div>
          <div className="result-header-logo">
            BallotBuddy
            <img className="results-header-pic" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAADEElEQVR4Xu2b4VHDMAxG5Q3YBNgANoEJGAk2gQ0om7CBOXPOXShNa/mTrdT++AmRnLwnuXZqgvDHlUBwHZ2DCwU4FwEFUIAzAefh2QEU4EzAeXh2AAU4E3Aenh1AAc4EnIdnB1ybgBhjdL7nvQ7/JSIPIYRvzQ2qO4ACTuKtgp8yUYCmXE9fWw2fApzhUwAmAKr8ZWhOQXUSTOCbdkAIQS2z7tnHilJD21oFUUBdYVBAHTezKAowQBljvNFuwMw/hGedghJ8EXkXkUMI4Vnrkx2gJba6fgX/Lv/6TSuBAioFnIC/ZFJJoIAKAWfgqyVQgFJAAfyUsXijRgEKAdbwuRN2hk8BhQJaVD73ATuAzw64IKFl5bMDdgCfHbAhoUflswN2AJ8dcCShZ+WzAxrAr3ktzZ2wiFhU/pIjhHBfuML9vWx6AZbwReRO+73I1AKs4f9WtPJwwrQCWsCngMLJtxV8CigQYAE/DRNj/Exz/vGQVzsFxRifRORFRB5rTxhc4m8FPws4eUz/KgVk+K8Z4KGFBEv4Qwk4gr8UsakEa/jDCNiAbyqhBfyRBKRKvz0zd0Od0Ar+SALSqbKPFhJawh9GQH4Qcwmt4Q8lwFpCD/jDCbCS0Av+kAJQCT3hDyugVkJv+EML0ErIS9h0Pv/fe5nV8rb4rOal1xnL363+VWu3r6NzVZcsUROTrvCH74BVlZUsUc8VrXnlT9MBBhKawZ+mAwAJTeFPJ0DxwZwubQ5/SgGFErrAn1bABQnd4E8tYENCV/jTC1hJeMsf1E+tvkfeWuMOvxEr3ZF6XUcBXuTzuBRAAX8JaM/DOPODh2cHwAixBBSA8YOjKQBGiCWgAIwfHE0BMEIsAQVg/OBoCoARYgkoAOMHR1MAjBBLQAEYPzh6dwLgJxokgfaVjNm5oEH4wY9BATBCLAEFYPzgaAqAEWIJKADjB0c3FwDfIRP8IaBeBZGfLQEKsOWpzkYBamS2ARRgy1OdjQLUyGwDKMCWpzobBaiR2QZQgC1PdTYKUCOzDaAAW57qbBSgRmYb8AM4sBOOunHPOgAAAABJRU5ErkJggg=="/>
          </div>
        </div>
        <div className="profile-tile-list">
          {this.renderProfile()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    zipResponse: state.landing.zipResponse
  }
}

export default connect(mapStateToProps, { showSearch, clearProfiles })(ProfilesList);

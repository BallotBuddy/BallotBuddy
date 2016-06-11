import _ from 'lodash';
import React from 'react';

console.log('candidateProfile.js engaged');

export default (props) => {
  console.log('props in profile-tile', props);
  return(
    <div>
      <h1>{props.data.cand_name}</h1>
      <h3>{props.data.state}, {props.data.party}</h3>
    </div>
  );
}

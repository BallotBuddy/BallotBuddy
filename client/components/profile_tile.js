import _ from 'lodash';
import React from 'react';

//To be implemented (not in use)
export default (props) => {
  return(
    <div>
      <h1>{props.data.cand_name}</h1>
      <h3>{props.data.state}, {props.data.party}</h3>
    </div>
  );
}

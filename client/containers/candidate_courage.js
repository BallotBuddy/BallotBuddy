import React, { Component } from 'react';

export default class CandidateCourage extends Component {

  renderCandidateCourage(){
    console.log('score in candidate_courgae: ',this.props.score);
    return this.props.score.map((issue) => {
      const name = issue.name;
      return (
        <div className="courage-issue" key={name}>{name}</div>
      )
    });
  }

  render(){
    return (
      <div className="candidate-courage-container">{this.renderCandidateCourage()}</div>
    );
  }
}
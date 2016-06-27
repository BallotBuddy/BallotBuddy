import _ from 'lodash';
import React, { Component } from 'react';
import { fetchTwitter, fetchCandidate } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Twitter extends Component { 

  componentWillMount() {
    this.props.fetchCandidate(this.props.candId)  //undefined
      .then ((data) => {  
        this.props.fetchTwitter(data.payload.data['0'].twitter_id)
        .then ((data) => {
        })       
      })
    
  }

  renderTwitterComponent(){
    return this.props.twitterdata.map((data) => {
      const created_at = data.created_at;
      const followers = data.folowers;
      const location = data.location;
      const text = data.text;
      const user = data.user;
      const url = data.url;

      return (
        <div className="twitter-tile" key={data.text}>
          <div className="twitter-message">
            {text}
          </div>
          <div>{created_at}</div>
          <div>{followers}</div>
          <div>{location}</div>
          <div>{user}</div>
          <div>{url}</div>
        </div>
       )
    });  
  }
  
    render(){
      const { twitterdata } = this.props.twitterdata;
      return(      
        <div> { this.props.twitterdata.length > 0 ? this.renderTwitterComponent():null }</div>
      );
    }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchTwitter, fetchCandidate }, dispatch);
}

function mapStateToProps(state){
  return { 
   twitterdata : state.profiles.twitterdata,
   singleProfile: state.search.singleProfile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Twitter);


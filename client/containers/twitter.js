import _ from 'lodash';
import React, { Component } from 'react';
import { fetchTwitter, fetchCandidate } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Twitter extends Component { 

  componentWillMount() {
    console.log("componentWillMount is in twitter.js firing!! this is the twitterId:",this.props.candId)
    this.props.fetchCandidate(this.props.candId)  //undefined
      .then ((data) => {  
        console.log("opensecrets data:", data.payload.data['0'].twitter_id )
        this.props.fetchTwitter(data.payload.data['0'].twitter_id)
        .then ((data) => {
          console.log("fetchTwitter data in componentWillMount:", data)
        })       
      })
    
  }

  //
// Object
// created_at
// :
// "Fri Jun 24 15:16:04 +0000 2016"
// followers
// :
// 15169
// location
// :
// "TX21"
// text
// :
// "Texas colleague @RepKevinBrady in @WSJ: "The GOP Plan for Tax Sanity"  https://t.co/tirrjehNvh #BetterWay"
// url
// :
// "http://t.co/1dfigsNXcr"
// user
// :
// "Lamar Smith"

  renderTwitterComponent(){
    console.log('renderTwitterComponent:', this.props.twitterdata)
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

      // console.log("this.props twitter render:", this.props.candId)
      //   // console.log('twitter render()',this.props); //undefined
      //   const tweet = this.props.twitterdata;
      //   console.log("render firinng! tweet", tweet)
      return(      
        <div> { this.props.twitterdata.length>0 ? this.renderTwitterComponent():null }</div>
      );
    }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchTwitter, fetchCandidate }, dispatch);
}

function mapStateToProps(state){
  console.log('state',state);     
  return { 
   twitterdata : state.profiles.twitterdata,
   singleProfile: state.search.singleProfile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Twitter);





import _ from 'lodash';
import React, { Component } from 'react';
import { fetchTwitter, fetchCandidate } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Twitter extends Component { 

  componentWillMount() {
    console.log("componentWillMount is firing!! this is the twitterId:",this.props.candId)
    this.props.fetchCandidate(this.props.candId)  //undefined
      .then ((data) => {
        console.log("opensecrets data:", data)
        this.props.fetchTwitter(data);       
      })
    
  }
  
    render(){
        console.log('twitter render()',this.props); //undefined
        const tweet = this.props.twitterdata;
        console.log("render firinng! tweet", tweet)
      return(      
  <div> {tweet}</div>
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
   singleProfile: state.profiles.singleProfile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Twitter);





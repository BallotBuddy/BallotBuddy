import _ from 'lodash';
import React, { Component } from 'react';
import { fetchTwitter, fetchCandidate } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Twitter extends Component { 

//   renderTweet(){
//     return this.props.contributors.map((tweet) => {
//   // [{"created_at":"","text":"","user":"","location":"","followers":"","url":""}]
//       return (
//         <div className="" key={tweet.text}>
//           <div className="">
//             {industry}
//           </div>
//           <div className="donor-type">
//             <div className="type">Individual</div>
//             <div className="type">Political Action Committee</div>
//             <div className="type">Total</div>
//           </div>
//           <div className="donation-amounts">
//             <div className="amount">{indivs}</div>
//             <div className="amount">{pacs}</div>
//             <div className="total-amount">{total}</div>
//           </div>
//         </div>
//       )
//     });
//   }
  componentWillMount() {
    console.log("componentWillMount is firing!! this is the twitterId:")
    this.props.fetchCandidate(this.props.candId)
      .then ((data) => {
        console.log("opensecrets data:", data.payload.data['0'].twitter_id)
        this.props.fetchTwitter(data);       
      })
    
  }
  
    render(){
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
  return {
   twitterdata : state.profiles.twitterdata,
   singleProfile: state.profiles.singleProfile
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Twitter);





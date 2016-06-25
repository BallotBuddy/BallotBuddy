import _ from 'lodash';
import React, { Component } from 'react';
import { fetchTwitter } from '../actions/index';
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
    console.log("componentWillMount is firing!! this is the twitterId:", this.props.twitterId)
    this.props.fetchTwitter();
    
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
  return bindActionCreators({ fetchTwitter }, dispatch);
}

function mapStateToProps(state){
  return {
   twitterdata : state.profiles.twitterdata
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Twitter);





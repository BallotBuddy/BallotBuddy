import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailedProfile from './detailed_profile'
import YTSearch from 'youtube-api-search';
import { fetchCandidate, fetchCandidateVideo } from '../actions/index';
import { bindActionCreators } from 'redux';



class CandidateVideo extends Component {
	componentWillMount(){

		this.props.fetchCandidate(this.props.candInfo)
			.then (() => {
				console.log("Bernie Sanders", this.props.ballotName)
				if(this.props.singleProfile.youtube_url){
					if(this.props.ballotName==="Bernie Sanders"){
						this.props.fetchCandidateVideo("Bernie Sanders official campaign")
					}else{						
					let URL = this.props.singleProfile.youtube_url;
					URL = URL.split("/")
					URL = URL[URL.length-1]
					this.props.fetchCandidateVideo(URL)				
					}
				}
			}).catch ((err) => {
				if(this.props.office==="President") {
					this.props.fetchCandidateVideo(`${this.props.ballotName} official campaign`)				
				}else{
					this.props.fetchCandidateVideo("Simpsons Donald Trump")
				}
			})
	}

	renderCandidatePlayer() {
		if (!this.props.video) {
			return <div>Loading...</div>;
		}
		const video = this.props.video;
		const videoId = video.id.videoId;
		const url = `https://www.youtube.com/embed/${videoId}`;
		
		return (
			<div className="video-player">
				<iframe className="you-tube-video" src={url}></iframe>
			</div>
	);
};

	render() {
		return (
			<div className = "video">
			{this.renderCandidatePlayer()}
			</div>
		);
	}
}

// function mapDispatchToProps(dispatch){
  // return bindActionCreators({ fetchCandidate, fetchCandidateVideo }, dispatch);
// }

function mapStateToProps(state){
  return { 
   singleProfile: state.landing.singleProfile,
   video: state.profiles.video
  }
}

export default connect(mapStateToProps, {fetchCandidateVideo, fetchCandidate})(CandidateVideo);

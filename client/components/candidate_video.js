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
				if(this.props.singleProfile.youtube_url){
					let URL = this.props.singleProfile.youtube_url;
					console.log("componentWillMount fired youtubeURL:", URL)
					URL = URL.split("/")
					console.log("URL:", URL)
					URL = URL[URL.length-1]
					console.log("URL:", URL)
					this.props.fetchCandidateVideo(URL)
				} else {
					this.props.fetchCandidateVideo(this.props.candInfo.ballotName)
				}
			})
    //   .then (() => {
    //   	console.log("singleProfile:", this.props.singleProfile)
				// this.props.fetchCandidateVideo(this.props.candInfo.ballotName)
		  //     .then (() => {
				// 	})
    //   })
	}
				// this.props.fetchCandidateVideo(stuff3 ? stuff3 : this.props.candInfo.ballotName)							

	searchCandidateVideo() {
			if (this.props.candYouTube){
				let stuff = this.props.candYouTube.youtube_url;
				console.log("componentWillMount fired youtubeURL:", stuff)
				let stuff2 = stuff.split("/")
				console.log("stuff2:", stuff2)
				let stuff3 = stuff2[stuff2.length-1]
				console.log("stuff3:", stuff3)
				return stuff3;
			}
	}
	
//`https://www.youtube.com/embed/${videoId}`

	// fetchCandidateVideo() {
	// 	// const youtubeURL = this.props.singleProfile.youtube_url;
	// 	// console.log("youtubeURL:", youtubeURL)

	// 	const name = this.props.candInfo.ballotName;
	// 	YTSearch({key: API_KEY, term: `${name}Official Campaign Video` }, (videos) => {
	// 		this.setState({
	// 			videos: videos,
	// 			selectedVideo: videos[0]
	// 		});
	// 	})
	// }

	renderCandidatePlayer() {
		if (!this.props.video) {
			return <div>Loading...</div>;
		}
		const video = this.props.video;		console.log('renderCandidatePlayer video:', video)
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
	console.log("state in candVideo:",state)
  return { 
   singleProfile: state.landing.singleProfile,
   video: state.profiles.video
  }
}

export default connect(mapStateToProps, {fetchCandidateVideo, fetchCandidate})(CandidateVideo);

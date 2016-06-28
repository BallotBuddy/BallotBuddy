import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailedProfile from './detailed_profile'
import YTSearch from 'youtube-api-search';
<<<<<<< 8d69735bb880262eed6602f2ab4c95a8dd618832
<<<<<<< 8eb323c9f31f27c79dc81f7f8fcc20b2daa10a0b
import { fetchCandidate, fetchCandidateVideo } from '../actions/index';
import { bindActionCreators } from 'redux';
=======
const api_keys = require('../../../api_keys');
=======
const api_keys = require('../../api_keys');
>>>>>>> take1
const api_key = api_keys.YOUTUBE_API;
const API_KEY = process.env.YOU_TUBE || api_key;
>>>>>>> fixed path issue

class CandidateVideo extends Component {

	// fetch a candidate video	
	componentWillMount(){

		// first retrieve open secrets data using candidate ID
		this.props.fetchCandidate(this.props.candInfo)
			.then (() => {

				// sort search by federal level candidates using the data from open secrets
				if(this.props.singleProfile.youtube_url){

					// if the candidate is Bernie use his presidental video
					if(this.props.ballotName==="Bernie Sanders"){
						this.props.fetchCandidateVideo("Bernie Sanders official campaign")
					}else{						
					let URL = this.props.singleProfile.youtube_url;
					URL = URL.split("/")
					URL = URL[URL.length-1]
					this.props.fetchCandidateVideo(`${URL} ${this.props.office}`)				
					}
				}

				// if the candidate is not congressional
			}).catch ((err) => {
				if(this.props.office==="President") {
					this.props.fetchCandidateVideo(`${this.props.ballotName} official campaign`)				
				}else{
					// return if data is undefined
					return
				}
			})
	}

	renderCandidatePlayer() {
		if (!this.props.video) {
			return <div>Loading...</div>;
		} 
		const video = this.props.video;
		console.log("video!!!!!", video)
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

function mapStateToProps(state){
  return { 
   singleProfile: state.landing.singleProfile,
   video: state.profiles.video
  }
}

export default connect(mapStateToProps, {fetchCandidateVideo, fetchCandidate})(CandidateVideo);

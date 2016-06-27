import React, { Component } from 'react';
import DetailedProfile from './detailed_profile'
import YTSearch from 'youtube-api-search';
const api_keys = require('../../api_keys');
const api_key = api_keys.YOUTUBE_API;
const API_KEY = process.env.Youtube_Key || api_key;

class CandidateVideo extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
	  };
	}

	componentWillMount(){
		this.fetchCandidateVideo();	
	}
	
	fetchCandidateVideo() {
		const name = this.props.candInfo.ballotName;
		YTSearch({key: API_KEY, term: `${name}Official Campaign Video` }, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		})
	}

	renderCandidatePlayer() {
		if (!this.state.selectedVideo) {
			return <div>Loading...</div>;
		}

		const video = this.state.selectedVideo;
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

export default CandidateVideo;

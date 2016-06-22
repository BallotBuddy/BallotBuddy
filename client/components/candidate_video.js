import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DetailedProfile from './detailed_profile'
import YTSearch from 'youtube-api-search';
var api_keys = require('../../api_keys');
var api_key = api_keys.YOUTUBE_API;
const API_KEY = process.env.Youtube_Key || api_key;

class CandidateVideo extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
	  };
		this.CandidateVideofetch();
	}
	
	CandidateVideofetch() {
		const name = this.props.candInfo.ballotName;
		console.log("name", name);
		YTSearch({key: API_KEY, term: name+" Official Campaign Video" }, (videos) => {
			console.log(videos)
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		})
	}

	renderCandidatePlayer() {
		console.log("video in render CandidatePlayer", this.state.selectedVideo);
		if (!this.state.selectedVideo) {
			return <div>Loading...</div>;
		}

		const video = this.state.selectedVideo;
		const videoId = video.id.videoId;
		const url = `https://www.youtube.com/embed/${videoId}`;
		
		return (
		<div className="video-player">
			<div>
				<iframe src={url}></iframe>
			</div>
			<div className= "details">
				<div>{video.snippet.title}</div>
			</div>
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
// function mapStateToProps(state) {
// 	return { voteSmartBio: state.profiles.voteSmartBio };
// }

//export default connect(mapStateToProps )(CandidateVideo);

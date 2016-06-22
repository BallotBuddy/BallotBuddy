import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DetailedProfile from './detailed_profile'
import YTSearch from 'youtube-api-search';
import CandidatePlayer from './candidate_player';
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

		this.CandidateVideofetch('Bernie Sanders Official Campaign Video')
	
	}
	
	CandidateVideofetch() {
	const name = this.props.candInfo.ballotName
	console.log("name", name)
		YTSearch({key: API_KEY, term: name+" Official Campaign Video" }, (videos) => {
			console.log(videos)
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		})
		
	}


	render() {
	this.CandidateVideofetch();
		return (
			<div className = "video">
					<div>
						<CandidatePlayer video={this.state.selectedVideo} />				
					</div>
			</div>
		);
	}
}


// export default CandidateVideo;
function mapStateToProps(state) {
	return { voteSmartBio: state.profiles.voteSmartBio };
}

export default connect(mapStateToProps )(CandidateVideo);

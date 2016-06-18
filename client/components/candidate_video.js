import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCandidateVideo } from '../actions/index';
import { Link } from 'react-router';
import YTSearch from 'youtube-api-search';
import CandidateVideoList from './candidate_video_list';
import CandidatePlayer from './candidate_player';
const API_KEY = 'AIzaSyDkPDfoyJbl4EvNTTQUg8EbXJM-rFGjCF8';

class CandidateVideo extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
			 };
	
			this.videoSearch('Bernie Sanders Official Presidental Campaign Ad');
	}
	
	componentWillMount(){
		this.props.fetchCandidateVideo();
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos:videos,
				selectedVideo: videos[0]
			 });
			this.setState({videos: videos})
		});
	}

	renderSingleVideo(){
		const { candidateVideo } = this.props;
		return (
			<div>
				<h3>{candidateVideo}</h3>
			</div>	
		);
	}

	render() {
		return (
			<div className = "video">
				<div>{this.renderSingleVideo()}</div>
					<div>
						<CandidatePlayer video={this.state.selectedVideo} />				
						<CandidateVideoList
							onVideoSelect={selectedVideo => this.setState({selectedVideo})}
							videos={this.state.videos} />
					</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { candidateVideo: state.profiles.candidateVideo };
}

export default connect(mapStateToProps, { fetchCandidateVideo })(CandidateVideo);

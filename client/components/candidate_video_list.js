import React from 'react';
import VideoListItem from './candidate_video_list_item';


const CandidateVideoList = (props) => {
	const videoItems = props.videos.map((video) =>{
		return <VideoListItem video = {video}/>
	})
	return (
		<div className = "video-list">
			<ul className = "video-list-row">
				{videoItems}
			</ul>
		</div>
		);
}

export default CandidateVideoList;

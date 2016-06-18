import React from 'react';

const VideoListItem = ({video, onVideoSelect}) => {
	const imageUrl = video.snippet.thumbnails.default.url;

	return (
	<li onClick={() => onVideoSelect(video)}>
		<div className="video-list media">
			<div className="media-left">
				<img className="video-thumbnail" src = {imageUrl}/>
			</div>
		</div>
	</li>
	);
};

export default VideoListItem;
			// <div className="media-body">
			// 	<div className='media-heading'>{video.snippet.title}</div>
			// </div>
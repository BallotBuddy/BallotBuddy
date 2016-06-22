import React from 'react';

const CandidatePlayer = ({video}) => {
	if (!video) {
		return <div>Loading...</div>;
	}

	const videoId = video.id.videoId;

	//es6 sugar =`https://www.youtube.com/embed/${videoId}`; 
	//'https://www.youtube.com/embed/'+ videoId;

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

export default CandidatePlayer;

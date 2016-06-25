import React, { Component } from 'react';

export default class AboutUs extends Component {

	render() {
		return (
			<div className="about_us">
				<h1>About Us</h1>
				<div className="about_project">
					<h2>Project</h2>
					<div>Ballotbuddy started as a class project, with the mission of making political information easily accessible for all voters.</div>
				</div>
				<div className="about_team">
					<h2>Team</h2>
					<div className="profile matt">
						<h3>Matt Dubose</h3>
						<img src="https://c4.staticflickr.com/8/7641/27786959651_c378e65eb3_m.jpg" alt="Matt Dubose" />
						<div>Matt is a student at Makersquare in Austin.</div>
						<ul className="contact_info list-unstyled list-inline">
							<li><a href="https://www.linkedin.com/in/matthew-dubose-732029b">LinkedIn</a></li>
							<li><a href="https://github.com/mjdubose/">Github</a></li>
						</ul>
					</div>
					<div className="profile james">
						<h3>James Lee</h3>
						<img src="https://c6.staticflickr.com/8/7354/27786959261_924e6e9214.jpg" alt="James Lee" />
						<div>James is a student at Makersquare in Austin.</div>
						<ul className="contact_info list-unstyled list-inline">
							<li><a href="https://www.linkedin.com/in/james-lee-atx">LinkedIn</a></li>
							<li><a href="https://github.com/JimmyLee87/">Github</a></li>
						</ul>
					</div>
					<div className="profile jack">
						<h3>Jack Hall</h3>
						<img src="https://c8.staticflickr.com/8/7406/27786958311_ec67890a0f_m.jpg" alt="Jack Hall" />
						<div>Jack is a student at Makersquare in Austin.</div>
						<ul className="contact_info list-unstyled list-inline">
							<li><a href="https://www.linkedin.com/in/jackjhall">LinkedIn</a></li>
							<li><a href="https://github.com/jackjhall22/">Github</a></li>
						</ul>
					</div>
					<div className="profile ryan">
						<h3>Ryan Newton</h3>
						<img src="https://c4.staticflickr.com/8/7056/27786958611_00789dc993_z.jpg" alt="Ryan Newton" />
						<div>Ryan is a student at Makersquare in Austin.</div>
						<ul className="contact_info list-unstyled list-inline">
							<li><a href="https://www.linkedin.com/in/rynewton">LinkedIn</a></li>
							<li><a href="https://github.com/ryannewton/">Github</a></li>
						</ul>
					</div>
				</div>
				<div className="about_sources">
					<h2>Sources</h2>
					<a href="http://www.votesmart.org">VoteSmart API</a>
					<a href="http://www.opensecrets.org">OpenSecrets API</a>
				</div>
			</div>
		)
	}
}

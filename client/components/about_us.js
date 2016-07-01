import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AboutUs extends Component {

	render() {
		const liIcon = 'http://www.apkdad.com/wp-content/uploads/2013/05/LinkedIn-Icon1.png';
		const ghIcon = 'https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png';
		return (
			<div className="about_us">
				<Link to={"/"} className="about-back-link">Back</Link>
				<div className="about_project">
					<h1>The Project</h1>
					<div className="project-line"></div>
					<div>Ballotbuddy started as a class project, with the mission of making political information easily accessible for all voters.</div>
				</div>
				<div className="about_team">
					<h1>The Team</h1>
					<div className="team-line"></div>
					<div className="team-box">
					<div className="team-tile">
						<div className="team-photo-box">
							<img className="team-member-photo" src="https://c4.staticflickr.com/8/7641/27786959651_c378e65eb3_m.jpg" alt="Matt Dubose" />
						</div>
						<h3>Matt DuBose</h3>
						<div className="team-member-blurb">Matt is a student at Makersquare in Austin. Matt enjoys long walks on the beach and time with his cat "Sofia Puffkins".</div>
						<ul className="contact_info list-unstyled list-inline">
							<img className="link-icon" src={liIcon}/>
							<li className="outer-li"><a href="https://www.linkedin.com/in/matthew-dubose-732029b">LinkedIn</a></li>
							<li className="mid-li">|</li>
							<img className="link-icon" src={ghIcon}/>
							<li className="outer-li"><a href="https://github.com/mjdubose/">Github</a></li>
						</ul>
					</div>
					<div className="team-tile">
						<div className="team-photo-box">
							<img className="team-member-photo" src="https://c6.staticflickr.com/8/7354/27786959261_924e6e9214.jpg" alt="James Lee" />
						</div>
						<h3>James Lee</h3>
						<div className="team-member-blurb">James is a student at Makersquare in Austin. James currently has control of all styling <em>(as evidenced by his colleague's descriptions...)</em>.</div>
						<ul className="contact_info list-unstyled list-inline">
							<img className="link-icon" src={liIcon}/>
							<li className="outer-li"><a href="https://www.linkedin.com/in/james-lee-atx">LinkedIn</a></li>
							<li className="mid-li">|</li>
							<img className="link-icon" src={ghIcon} />
							<li className="outer-li"><a href="https://github.com/JimmyLee87/">Github</a></li>
						</ul>
					</div>
					<div className="team-tile">
						<div className="team-photo-box">
							<img className="team-member-photo" src="https://c8.staticflickr.com/8/7406/27786958311_ec67890a0f_m.jpg" alt="Jack Hall" />
						</div>
						<h3>Jack Hall</h3>
						<div className="team-member-blurb">Jack is a student at Makersquare in Austin. Jack is <em>literally</em> a ninja.</div>
						<ul className="contact_info list-unstyled list-inline">
							<img className="link-icon" src={liIcon}/>
							<li className="outer-li"><a href="https://www.linkedin.com/in/jackjhall">LinkedIn</a></li>
							<li className="mid-li">|</li>
							<img className="link-icon" src={ghIcon} />
							<li className="outer-li"><a href="https://github.com/jackjhall22/">Github</a></li>
						</ul>
					</div>
					<div className="team-tile">
						<div className="team-photo-box">
							<img className="team-member-photo" src="https://c4.staticflickr.com/8/7056/27786958611_00789dc993_z.jpg" alt="Ryan Newton" />
						</div>
						<h3>Ryan Newton</h3>
						<div className="team-member-blurb">Ryan is a student at Makersquare in Austin. Ryan lives for happy hours and kimchi.</div>
						<ul className="contact_info list-unstyled list-inline">
							<img className="link-icon" src={liIcon}/>
							<li className="outer-li"><a href="https://www.linkedin.com/in/rynewton">LinkedIn</a></li>
							<li className="mid-li">|</li>
							<img className="link-icon" src={ghIcon} />
							<li className="outer-li"><a href="https://github.com/ryannewton/">Github</a></li>
						</ul>
					</div>
					</div>
				</div>
				<div className="about_sources">
					<h1>Our Sources</h1>
					<div className="sources-line"></div>
					<div className="sources-box">
					<a href="http://www.votesmart.org">VoteSmart API</a>
					<a href="http://www.opensecrets.org">OpenSecrets API</a>
					</div>
				</div>
			</div>
		);
	}
}

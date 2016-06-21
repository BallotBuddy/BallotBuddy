import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCandidate } from '../actions/index';

export default class CandidateExperience extends Component {

	renderCandidateExperience() {
		const sectionObjs = [];
		sectionObjs.push({section: "Education", data:this.props.candInfo.education});
		sectionObjs.push({section: "Professional", data:this.props.candInfo.profession});
		sectionObjs.push({section: "Political", data:this.props.candInfo.political});
		sectionObjs.push({section: "Congressional", data:this.props.candInfo.congMembership});
		sectionObjs.push({section: "Other", data:this.props.candInfo.orgMembership});

		return (
			<div>
				{ sectionObjs.map((obj) => {
					return (
						<div className={obj.section}>
							<h3>{obj.section}</h3>
							<div>{obj.data}</div>
						</div>
					)
				}) }
			</div>
		)
	}

	render() {
		return (
			<div className="candidate-experience">
				<div>Candidate Experience</div>
				{this.renderCandidateExperience()}
			</div>
		);
	}
}
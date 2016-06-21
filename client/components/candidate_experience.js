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
			<table>
				{ sectionObjs.map((obj) => {
					return (
						<tr className={obj.section}>
							<td className="experience-section">{obj.section}:</td>
							<td className="experience-details">
								<ul className="list-unstyled">
									{/*Puts each newline on it's own bullet*/}
									{ obj.data.split('\n').map(line => { return <li>{line}</li> }) }
								</ul>
							</td>
						</tr>
					)
				}) }
			</table>
		)
	}

	render() {
		return (
			<div className="candidate-experience col-sx-12 col-sm-6">
				<div className="text-center">Candidate Experience</div>
				{this.renderCandidateExperience()}
			</div>
		);
	}
}
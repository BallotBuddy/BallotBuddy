import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCandidate } from '../actions/index';

export default class CandidateExperience extends Component {

	renderCandidateExperience() {
		const sectionObjs = [];
		sectionObjs.push({category: "Education", data:this.props.candInfo.education});
		sectionObjs.push({category: "Professional", data:this.props.candInfo.profession});
		sectionObjs.push({category: "Political", data:this.props.candInfo.political});
		sectionObjs.push({category: "Congressional", data:this.props.candInfo.congMembership});
		sectionObjs.push({category: "Other", data:this.props.candInfo.orgMembership});

		return (
			<table>
				{ sectionObjs.map((obj) => {
					return (
						<tr className={obj.category} key={obj.category}>
							<td className="experience-cagtegory">{obj.category}:</td>
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
			<div className="experience-component col-sx-12 col-sm-6">
				<div className="text-center">Candidate Experience</div>
				{this.renderCandidateExperience()}
			</div>
		);
	}
}
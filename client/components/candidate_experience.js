import React, { Component } from 'react';

export default class CandidateExperience extends Component {

	renderCandidateExperience() {
		const sectionObjs = [];
		sectionObjs.push({category: "Education", data:this.props.candInfo.education});
		sectionObjs.push({category: "Professional", data:this.props.candInfo.profession});
		sectionObjs.push({category: "Political", data:this.props.candInfo.political});
		sectionObjs.push({category: "Congressional", data:this.props.candInfo.congMembership});
		sectionObjs.push({category: "Other", data:this.props.candInfo.orgMembership});
		return (
			<table className="candidate-experience-table">
				<tbody className="candidate-table-body">
					{ sectionObjs.map((obj) => {
						return (
							<tr className="table-row-category" key={obj.category}>
								<td className="experience-category">{obj.category}:</td>
								<td className="experience-details">
									<ul className="list-unstyled">
										{/*Puts each newline on it's own bullet*/}
										{ obj.data.split('\n').map(line => { return <li className="experience-item" key={line}>{line}</li> }) }
									</ul>
								</td>
							</tr>
						)
					}) }
				</tbody>
			</table>
		)
	}

	render() {
		return (
			<div className="experience-component-box">
				<div className="candidate-experience-title">Experience</div>
				<div className="experience-title-line"></div>
					{this.renderCandidateExperience()}
			</div>
		);
	}
}

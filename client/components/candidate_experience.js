import React, { Component } from 'react';

// Builds a component showing the candidate's experience. Used on the detailed_profile page
export default class CandidateExperience extends Component {

	renderCandidateExperience() {
		const candInfo = this.props.candInfo;
		const expObjs = [];
		expObjs.push({category: "Education",			data: candInfo.education			});
		expObjs.push({category: "Professional",		data: candInfo.profession			});
		expObjs.push({category: "Political",			data: candInfo.political			});
		expObjs.push({category: "Congressional",	data: candInfo.congMembership	});
		expObjs.push({category: "Other", 					data: candInfo.orgMembership	});

		return (
			<table className="candidate-experience-table">
				<tbody className="candidate-table-body">
					{/* Maps through each experience category and builds a table row */}
					{ expObjs.map((obj) => {
						return (
							<tr className="table-row-category" key={obj.category}>
								<td className="experience-category">{obj.category}:</td>
								<td className="experience-details">
									<ul className="list-unstyled">
										{/* Puts each newline on it's own bullet */}
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

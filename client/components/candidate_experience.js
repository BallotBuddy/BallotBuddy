import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchCandidate } from '../actions/index';

export default class CandidateExperience extends Component {

	renderCandidateExperience() {
		const sectionObjs = [
			{
				section: "education",
				data: "JD, Yale University, 1973\nBA, Wellesley College, 1969"
			}, {
				section: "profession",
				data: "Attorney, Rose Law Firm, 1976-1992\nAssistant Professor, University of Arkansas Law School, 1975\nAuthor\nFormer Staff Attorney, Children's Defense Fund\nFormer Board Member, Wal-Mart"
			}, {
				section: "political",
				data: "Candidate, United States President, 2016\nUnited States Secretary of State, 2009-2013\nSworn In, United States Secretary of State, January 21, 2009\nSenator, United States Senate, 2001-2009\nCandidate, United States President, 2008\nFirst Lady, President Bill Clinton, 1992-2000\nFirst Lady, State of Arkansas, 1978-1980, 1982-1992\nMember, Democratic Policy Committee"
			}, {
				section: "congMembership",
				data: "Appointed, Board, Legal Services Corporation, 1977\nFormer Chair, Arkansas Educational Standards Committee\nFormer Commissioner, Commission on Security and Cooperation in Europe \nFormer Co-Chair, Congressional E-911 Caucus\nFormer Member, Democratic Technology and Communications Committee\nFormer Board Member, Legal Services Corporation\nFormer Chair, Legal Services Corporation\nFormer Member, Senate National Guard Caucus\nFormer Member, Senate Rural Health Caucus\nFormer Member, Senate Steel Caucus\nFormer Chair, Steering and Coordination Committee\nFormer Chair, Task Force of National Health Care Reform"
			}, {
				section: "orgMembership",
				data: "Member, American Bar Association's Commission on Women in the Profession\nCo-Founder, Arkansas Advocates for Children and Families\nFormer Board Member, Arkansas Children's Hospital\nFormer Board Member, Children's Defense Fund\nBoard Member, The Country's Best Yogurt Company\nFounder, Vital Voices"
			}
		];

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
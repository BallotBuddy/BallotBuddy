import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// importing the fetchProfile action...
import { fetchProfile } from '../actions/index';
// import CandidateProfile from '../components/candidateProfile';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { searchTerm: '' };

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		console.log( event.target.value );
		this.setState( { searchTerm: event.target.value });
		this.props.fetchProfile( event.target.value );
	}

	onFormSubmit(event) {
		event.preventDefault();
		this.props.fetchProfile( this.state.searchTerm );
		this.setState( { searchTerm: '' } );
	}

	renderProfile(profileData){
		console.log('renderProfile is firing: ', profileData);
		return (
			<div>
				{profileData}
			</div>
		);
	}

	render() {		
		return(
			<div>
				{this.renderProfile}
			<form onSubmit={this.onFormSubmit} className="input-group">
				<input
					placeholder="e.g. Barack Obama"
					value={this.state.searchTerm}
					onChange={this.onInputChange} />
				<span className="input-group-btn">
					<button	type="submit" className="btn btn-secondary">
						Submit
					</button>
				</span>
			</form>
			</div>
		);
	}
}

// function mapStateToProps({ profile }){
// 	console.log('search_bar - mapStateToProps fired', {profile: profile});
// 	return { profile };
// }

// function mapStateToProps ({ profile }){
// 	console.log('mapStateToProps profile info: ', profile);
// 	return { profile }
// }

function mapDispatchToProps(dispatch) {
	console.log('dispatching from search_bar.js: ', dispatch);
	return bindActionCreators({ fetchProfile }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);

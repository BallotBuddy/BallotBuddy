import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProfile } from '../actions/index';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { searchTerm: '' };

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	// gets candidate data based on search term
	onInputChange(event) {
		this.setState( { searchTerm: event.target.value });
		this.props.fetchProfile( event.target.value );
	}

	// updates search results when user clicks 'submit' button
	onFormSubmit(event) {
		event.preventDefault();
		this.props.fetchProfile( this.state.searchTerm );
		this.setState( { searchTerm: '' } );
	}

	// builds search bar elements (input & button)
	render() {		
		return(
			<div>
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchProfile }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);

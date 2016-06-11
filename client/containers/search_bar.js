import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { searchTerm: '' };

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event) {
		console.log( event.target.value );
		this.setState( { searchTerm: event.target.value });
	}

	onFormSubmit(event) {
		event.preventDefault();
		console.log("Submit clicked");
		//call function that activates API
		//e.g. this.props.fetchWeather(this.state.term);
		this.setState( { searchTerm: '' } );
	}

	render() {
		return(
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
		)
	}
}
/*
function mapDispatchToProps(dispatch) {
	//send data to API call
	//e.g. return bindActionCreators({ **fill me in** }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);

*/
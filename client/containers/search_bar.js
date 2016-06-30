import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchByZip } from '../actions/index';
import { Link } from 'react-router';
import { showList } from '../actions/index';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { searchTerm: ''};

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onButtonClick = this.onButtonClick.bind(this);
	}

	// two-way binds the search input value to this.state.searchTerm
	onInputChange(event) {
		this.setState( { searchTerm: event.target.value });
	}

	// initiates the fetchByZip action to perform the search.
	onFormSubmit(event) {
		event.preventDefault();
		this.props.fetchByZip( this.state.searchTerm );
		this.props.showList();
		this.setState( { searchTerm: '' } );
	}

	//this button click will eventually allow a user to see candidates
	// by current location (won't need to enter a zip)
	onButtonClick(event) {
		this.props.showList();
	}

	// builds search bar elements
	render() {
		return(
			<div className="main-header">
				<header	className="header">
					<div className="ballot-buddy-logo">
						<div>
							BallotBuddy
							<img className="ballot-buddy-image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAADEElEQVR4Xu2b4VHDMAxG5Q3YBNgANoEJGAk2gQ0om7CBOXPOXShNa/mTrdT++AmRnLwnuXZqgvDHlUBwHZ2DCwU4FwEFUIAzAefh2QEU4EzAeXh2AAU4E3Aenh1AAc4EnIdnB1ybgBhjdL7nvQ7/JSIPIYRvzQ2qO4ACTuKtgp8yUYCmXE9fWw2fApzhUwAmAKr8ZWhOQXUSTOCbdkAIQS2z7tnHilJD21oFUUBdYVBAHTezKAowQBljvNFuwMw/hGedghJ8EXkXkUMI4Vnrkx2gJba6fgX/Lv/6TSuBAioFnIC/ZFJJoIAKAWfgqyVQgFJAAfyUsXijRgEKAdbwuRN2hk8BhQJaVD73ATuAzw64IKFl5bMDdgCfHbAhoUflswN2AJ8dcCShZ+WzAxrAr3ktzZ2wiFhU/pIjhHBfuML9vWx6AZbwReRO+73I1AKs4f9WtPJwwrQCWsCngMLJtxV8CigQYAE/DRNj/Exz/vGQVzsFxRifRORFRB5rTxhc4m8FPws4eUz/KgVk+K8Z4KGFBEv4Qwk4gr8UsakEa/jDCNiAbyqhBfyRBKRKvz0zd0Od0Ar+SALSqbKPFhJawh9GQH4Qcwmt4Q8lwFpCD/jDCbCS0Av+kAJQCT3hDyugVkJv+EML0ErIS9h0Pv/fe5nV8rb4rOal1xnL363+VWu3r6NzVZcsUROTrvCH74BVlZUsUc8VrXnlT9MBBhKawZ+mAwAJTeFPJ0DxwZwubQ5/SgGFErrAn1bABQnd4E8tYENCV/jTC1hJeMsf1E+tvkfeWuMOvxEr3ZF6XUcBXuTzuBRAAX8JaM/DOPODh2cHwAixBBSA8YOjKQBGiCWgAIwfHE0BMEIsAQVg/OBoCoARYgkoAOMHR1MAjBBLQAEYPzh6dwLgJxokgfaVjNm5oEH4wY9BATBCLAEFYPzgaAqAEWIJKADjB0c3FwDfIRP8IaBeBZGfLQEKsOWpzkYBamS2ARRgy1OdjQLUyGwDKMCWpzobBaiR2QZQgC1PdTYKUCOzDaAAW57qbBSgRmYb8AM4sBOOunHPOgAAAABJRU5ErkJggg=="/>
						</div>
					</div>
					<div className="search-bar">
						<form className="zip-option" onSubmit={this.onFormSubmit}>
						<span className="search-choice">enter zip code</span>
							<input
								className="search-input"
								placeholder="e.g. 78704"
								value={this.state.searchTerm}
								onChange={this.onInputChange} />
						</form>
						<div className="search-by-location" onClick={this.onFormSubmit}>find candidates</div>
					</div>
				</header>
				<Link to="/aboutus" className="about-us-button">About Us</Link>
			</div>
		);
	}
}

export default connect(null, { fetchByZip, showList })(SearchBar);


import React, { Component } from 'react';

export default class Loader extends Component {

  render(){
    return (
      <div className="search-results">
        <div className="result-header">
          <div className="go-back-button" onClick={() => {this.backButtonClick()}}>back</div>
          <div className="result-header-logo">
            BallotBuddy
            <img className="results-header-pic" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAADEElEQVR4Xu2b4VHDMAxG5Q3YBNgANoEJGAk2gQ0om7CBOXPOXShNa/mTrdT++AmRnLwnuXZqgvDHlUBwHZ2DCwU4FwEFUIAzAefh2QEU4EzAeXh2AAU4E3Aenh1AAc4EnIdnB1ybgBhjdL7nvQ7/JSIPIYRvzQ2qO4ACTuKtgp8yUYCmXE9fWw2fApzhUwAmAKr8ZWhOQXUSTOCbdkAIQS2z7tnHilJD21oFUUBdYVBAHTezKAowQBljvNFuwMw/hGedghJ8EXkXkUMI4Vnrkx2gJba6fgX/Lv/6TSuBAioFnIC/ZFJJoIAKAWfgqyVQgFJAAfyUsXijRgEKAdbwuRN2hk8BhQJaVD73ATuAzw64IKFl5bMDdgCfHbAhoUflswN2AJ8dcCShZ+WzAxrAr3ktzZ2wiFhU/pIjhHBfuML9vWx6AZbwReRO+73I1AKs4f9WtPJwwrQCWsCngMLJtxV8CigQYAE/DRNj/Exz/vGQVzsFxRifRORFRB5rTxhc4m8FPws4eUz/KgVk+K8Z4KGFBEv4Qwk4gr8UsakEa/jDCNiAbyqhBfyRBKRKvz0zd0Od0Ar+SALSqbKPFhJawh9GQH4Qcwmt4Q8lwFpCD/jDCbCS0Av+kAJQCT3hDyugVkJv+EML0ErIS9h0Pv/fe5nV8rb4rOal1xnL363+VWu3r6NzVZcsUROTrvCH74BVlZUsUc8VrXnlT9MBBhKawZ+mAwAJTeFPJ0DxwZwubQ5/SgGFErrAn1bABQnd4E8tYENCV/jTC1hJeMsf1E+tvkfeWuMOvxEr3ZF6XUcBXuTzuBRAAX8JaM/DOPODh2cHwAixBBSA8YOjKQBGiCWgAIwfHE0BMEIsAQVg/OBoCoARYgkoAOMHR1MAjBBLQAEYPzh6dwLgJxokgfaVjNm5oEH4wY9BATBCLAEFYPzgaAqAEWIJKADjB0c3FwDfIRP8IaBeBZGfLQEKsOWpzkYBamS2ARRgy1OdjQLUyGwDKMCWpzobBaiR2QZQgC1PdTYKUCOzDaAAW57qbBSgRmYb8AM4sBOOunHPOgAAAABJRU5ErkJggg=="/>
          </div>
        </div>
        <div className="cs-loader">
          <div className="cs-loader-inner">
            <label> ●</label>
            <label> ●</label>
            <label> ●</label>
          </div>
        </div>
      </div>
    );
  }
}
import React from 'react';

import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import ProfilesList from './containers/profiles_list';
import SearchBar from './containers/search_bar';
import DetailedProfile from './components/detailed_profile';
import CandidateVideo from './components/candidate_video';
import AboutUs from './components/about_us';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SearchBar} />
    <Route path="profile/:cid" component={DetailedProfile}>
    </Route>
    <Route path="aboutus" component={AboutUs}></Route>
  </Route>
);
import React from 'react';

import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import ProfilesList from './containers/profiles_list';
import SearchBar from './containers/search_bar';
import DetailedProfile from './components/detailed_profile';
<<<<<<< 278bde5bb5b331bd089fc05d5164abbc54badaab
import CandidateVideo from './components/candidate_video';
import AboutUs from './components/about_us';
=======
import AboutUs from './components/about_us';
import CandidateVideo from './components/candidate_video';
>>>>>>> refactor to display just the video player

export default (
  <Route path="/" component={App}>
    <IndexRoute component={SearchBar} />
    <Route path="profile/:cid" component={DetailedProfile}>
    </Route>
    <Route path="aboutus" component={AboutUs}></Route>
<<<<<<< 278bde5bb5b331bd089fc05d5164abbc54badaab
    <Route path="jack" component={CandidateVideo}>
=======
    <Route path="profile/:cid" component={CandidateVideo}>
>>>>>>> refactor to display just the video player
    </Route>
  </Route>
);
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import LandingPage from './components/landing_page';
import DetailedProfile from './components/detailed_profile';
import AboutUs from './components/about_us';

// maps url routes to the components
export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="profile/:cid" component={DetailedProfile} />
    <Route path="aboutus" component={AboutUs} />
  </Route>
);

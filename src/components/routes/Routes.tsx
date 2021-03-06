import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import Songs from 'components/songs/songs';
import PublicRoute from './PublicRoute';

const Routes: FunctionComponent = () => (
    <Router>
        <Switch>
            <PublicRoute component={Songs} path="/songs" exact />
            <Redirect to="/songs" />
        </Switch>
    </Router>
);

export default Routes;

import React, { FunctionComponent } from 'react';
import {
    Route,
} from 'react-router-dom';
import { string, bool, any } from 'prop-types';

interface IPublicRouteProps {
    component: any;
    path: string;
    exact: boolean;
}

const PublicRoute: FunctionComponent<IPublicRouteProps> = ({
    component,
    path,
    exact,
}) => <Route component={component} path={path} exact={exact} />;

PublicRoute.propTypes = {
    component: any.isRequired,
    path: string.isRequired,
    exact: bool.isRequired,
};

export default PublicRoute;

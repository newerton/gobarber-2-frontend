import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Signup from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={Signup} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;

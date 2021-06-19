import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AppBar from '../AppBar';
import ProtectedRoute from '../../auth/protected-route';
import Profile from '../Profile';
import ExternalApi from '../views/ExternalAPI';

const App = () => {
	return (
		<div id="app">
			<AppBar />
			<div>
				<Switch>
					<Route path="/" exact />
					<ProtectedRoute path="/profile" component={Profile} />
					<ProtectedRoute path="/external-api" component={ExternalApi} />
				</Switch>
			</div>
		</div>
	);
};

export default App;

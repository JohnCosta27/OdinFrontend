import React, { useEffect, userEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AppBar from '../AppBar';
import ProtectedRoute from '../../auth/protected-route';
import Profile from '../Profile';
import ExternalApi from '../views/ExternalAPI';

/**
 * App component
 *  * App calls /api/sync method to register, or update user on database
 */

const App = () => {

	useEffect(() => {
		sync();
	}, []);

	const { getAccessTokenSilently } = useAuth0();
	const serverUrl = process.env.REACT_APP_SERVER_URL;

	const sync = async () => {
		try {
			const token = await getAccessTokenSilently();
			await fetch(`${serverUrl}/api/sync`, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
		} catch (error) {}
	};

	return (
		<div id="app">
			<AppBar />
			<div>
				<Switch>
					<Route path="/" exact />
					<ProtectedRoute path="/profile" component={Profile} />
					<ProtectedRoute
						path="/external-api"
						component={ExternalApi}
					/>
				</Switch>
			</div>
		</div>
	);
};

export default App;

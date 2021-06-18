import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AppBar from '../AppBar';

const App = () => {
	return (
		<div id="app">
			<AppBar />
			<div>
				<Switch>
					<Route path="/" exact />
					<Route path="/profile" />
					<Route path="/external-api" />
				</Switch>
			</div>
		</div>
	);
};

export default App;

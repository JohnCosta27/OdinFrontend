import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../AppBar';
import ProtectedRoute from '../../auth/protected-route';
import Profile from '../Profile';
import ExternalApi from '../views/ExternalAPI';
import CreateSubject from '../subjects/CreateSubject';
import CreateSubjectPoints from '../subjects/CreateSubjectPoints';
import Subject from '../views/Subject';
import AddProgress from '../progress/AddProgress';
import StudentDashboard from '../views/StudentDashboard';
import Point from '../views/Point';
import Admin from '../views/Admin';
import Student from '../views/Student';

/**
 * App component
 *  * App calls /api/sync method to register, or update user on database
 */

const App = () => {
	useEffect(() => {
		sync();
	}, []);

	const useStyles = makeStyles((theme) => ({
		main: {
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
			paddingTop: theme.spacing(5),
		},
	}));

	const classes = useStyles();

	const { getAccessTokenSilently } = useAuth0();
	const serverUrl = process.env.REACT_APP_SERVER_URL;

	const sync = () => {
		getAccessTokenSilently().then((token) => {
			fetch(`${serverUrl}/api/sync`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => response.json())
				.then((response) => {
				});
		});
	};
	return (
		<div>
			<AppBar />
			<div className={classes.main}>
				<Switch>
					<Route path="/" exact />
					<ProtectedRoute path="/dashboard" component={StudentDashboard} />
					<ProtectedRoute path="/subject" component={Subject} />
					<ProtectedRoute path="/point" component={Point} />
					<ProtectedRoute path="/external-api" component={ExternalApi} />
					<ProtectedRoute path="/admin" component={Admin} />
					<ProtectedRoute path="/student" component={Student} />
				</Switch>
			</div>
		</div>
	);
};

export default App;

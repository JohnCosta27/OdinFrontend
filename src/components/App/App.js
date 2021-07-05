import React, { useEffect, userEffect } from 'react';
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

	const sync = async () => {
		try {
			const token = await getAccessTokenSilently();
			await fetch(`${serverUrl}/api/sync`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (error) {}
	};
	return (
		<div>
			<AppBar />
			<div className={classes.main}>
				<Switch>
					<Route path="/" exact />
					<ProtectedRoute
						path="/dashboard"
						component={StudentDashboard}
					/>
					<ProtectedRoute path="/profile" component={Profile} />
					<ProtectedRoute path="/subject" component={Subject} />
					<ProtectedRoute path="/point" component={Point} />
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

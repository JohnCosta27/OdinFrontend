import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

const LatestProgress = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [learntPoints, setLearntPoints] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) getProgress();
	}, []);

	const useStyles = makeStyles((theme) => ({
		main: {
			width: 800,
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),
			display: 'flex',
			justifyContent: 'center',
			[theme.breakpoints.down('sm')]: {
				width: '100%',
			},
		},
		paper: {
			width: '100%',
		},
	}));

	const getProgress = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/progress/get`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		console.log(responseData);
		setLearntPoints(responseData);
		setLoading(false);
	};

	const classes = useStyles();

	if (loading) {
		return (
			<div className={classes.main}>
				<CircularProgress />
			</div>
		);
	} else {
		return (
			<div className={classes.main}>
				<Paper className={classes.paper} elevation={4}>
					<Typography variant="h2" align="center">
						Latest Learnt
					</Typography>
					{learntPoints.map((point) => (
						<List key={point.id}>
							<ListItem button>
								<ListItemText
									primary={
										point.points.topics.subjects.level +
										' ' +
										point.points.topics.subjects.name +
										' (' +
										point.points.topics.subjects.examboard +
										') - ' + point.points.topics.name
									}
									secondary={point.points.name}
								/>
							</ListItem>
						</List>
					))}
				</Paper>
			</div>
		);
	}
};
export default LatestProgress;

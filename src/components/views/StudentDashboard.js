import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LatestProgress from '../general/LatestProgress';

const StudentDashboard = () => {
	const useStyles = makeStyles((theme) => ({
		main: {
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
			paddingTop: theme.spacing(5),
		},
	}));

	const classes = useStyles();

	return (
		<div className={classes.main}>
			<LatestProgress />
		</div>
	);
};

export default StudentDashboard;

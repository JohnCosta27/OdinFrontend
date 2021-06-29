import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const ContentCard = (props) => {
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

	const classes = useStyles();

	return (
		<div className={classes.main}>
			<Paper className={classes.paper} elevation={4}>
				{props.children}
			</Paper>
		</div>
	);
};
export default ContentCard;

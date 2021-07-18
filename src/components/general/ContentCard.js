import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const ContentCard = (props) => {
	const useStyles = makeStyles((theme) => ({
		main: {
			width: (props.small) ? 1000: '100%',
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),
			paddingTop: theme.spacing(5),
			paddingBottom: theme.spacing(5),
			display: 'flex',
			justifyContent: 'center',
		},
		paper: {
			width: '100%',
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			height: '100%',
		},
		final: {
			width: '100%',
			flex: '1 1 auto', 
			display: 'flex',
			flexDirection: (props.row) ? 'row' : 'column',
			justifyContent: (props.center) ? 'center' : 'space-between',
			height: '100%',
		},
	}));

	const classes = useStyles();

	return (
		<div className={classes.main}>
			<Paper className={classes.paper} elevation={4}>
				<div className={classes.final}>{props.children}</div>
			</Paper>
		</div>
	);
};
export default ContentCard;

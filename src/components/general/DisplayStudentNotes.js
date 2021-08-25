import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const DisplayStudentNotes = (props) => {
	const useStyles = makeStyles((theme) => ({
		flexWrapper: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '100%',
		},
		paper: {
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),
			paddingTop: theme.spacing(2),
			paddingBottom: theme.spacing(2),
		},
	}));

	const classes = useStyles();

	return (
		<div className={classes.flexWrapper}>
			<Paper
				elevation={4}
				className={classes.paper}
				style={{ width: 400 }}
			>
				<Typography variant="h2" color="initial" align="center">
					Notes
				</Typography>
			</Paper>
			<Grid container className={classes.paper}>
				{props.notes.map((note) => (
					<Grid item xs className={classes.paper}>
						<Paper elevation={4} className={classes.paper}>
							<Typography
								variant="h3"
								color="initial"
								align="center"
							>
								{note.title}
							</Typography>
							<Typography
								variant="h3"
								color="initial"
								align="left"
							>
								{note.content}
							</Typography>
						</Paper>
					</Grid>
				))}
			</Grid>
		</div>
	);
};
export default DisplayStudentNotes;

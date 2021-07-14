import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const GridItem = (props) => {
	const useStyles = makeStyles((theme) => ({
		gridItem: {
			display: 'flex',
			justifyContent: 'center',
            width: '100%'
		},
	}));

	const classes = useStyles();

	return (
		<Grid item lg={props.lg} md={props.md} xs={props.xs} className={classes.gridItem}>
			{props.children}
		</Grid>
	);
};
export default GridItem;

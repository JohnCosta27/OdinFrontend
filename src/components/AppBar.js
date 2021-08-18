import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBarComponent from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AuthenticationButton from './AuthenticationButton';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const AppBar = () => {
	const useStyles = makeStyles((theme) => ({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
		toolbarStyles: {
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),
		},
	}));

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBarComponent position="static">
				<Toolbar className={classes.toolbarStyles}>
					<Typography variant="h6" className={classes.title}>
						Odin
					</Typography>
					<AuthenticationButton />
				</Toolbar>
			</AppBarComponent>
		</div>
	);
};

export default AppBar;

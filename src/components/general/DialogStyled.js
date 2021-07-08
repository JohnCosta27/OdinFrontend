import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

const DialogStyled = (props) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			justifyContent: 'center'
		},
		paper: {
			minWidth: 500,
			[theme.breakpoints.down('sm')]: {
				minWidth: 0,
			},
		},
		borderError: {
			borderStyle: 'solid',
			borderWidth: 2,
			borderColor: theme.palette.error.main,
		},
		dialogWrapper: {
			marginLeft: theme.spacing(5),
			marginRight: theme.spacing(5),
			marginTop: theme.spacing(5),
			marginBottom: theme.spacing(5),
			display: 'flex',
			flexDirection: 'column',
		},
		submitButton: {
			width: '100%',
			marginBottom: theme.spacing(2),
			marginTop: theme.spacing(5),
		},
		title: {
			paddingTop: theme.spacing(5),
			paddingBottom: theme.spacing(0),
		},
		closeIcon: {
			position: 'absolute',
			bottom: 0,
			right: 0,
			marginRight: theme.spacing(5),
			marginBottom: theme.spacing(5),
		},
	}));

	const getFab = () => {
		if (fullScreen) {
			return (
				<Fab
					aria-label="close"
					color="secondary"
					className={classes.closeIcon}
					onClick={() => props.setOpen(false)}
				>
					<CloseIcon color="primary" />
				</Fab>
			);
		}
	};

	const handleClickOpen = () => {
		props.setOpen(true);
	};
	const handleClose = () => {
		props.setOpen(false);
	};
	const classes = useStyles();
	let counter = 0;

	return (
		<div className={classes.root}>
			<Button
				variant="contained"
				color="secondary"
				onClick={handleClickOpen}
			>
				{props.buttonTitle}
			</Button>
			<Dialog
				onClose={handleClose}
				open={props.open}
				classes={{ paper: classes.paper }}
				fullScreen={fullScreen}
			>
				<DialogTitle align="center" className={classes.title}>
					{props.title}
				</DialogTitle>
				<DialogContent>
					<form
						onSubmit={(event) => props.onSubmit(event)}
						className={classes.dialogWrapper}
					>
						{React.Children.map(props.children, (child) => {
							//*Dirty try catch to prevent not loaded errors
							try {
								if (child.type == <div></div>) {
								} else {
									return <div key={counter++}>{child}</div>;
								}
							} catch (error) {}
						})}
						<Button
							color="secondary"
							className={classes.submitButton}
							type="submit"
						>
							{props.submitTitle}
						</Button>
					</form>
				</DialogContent>
				{getFab()}
			</Dialog>
		</div>
	);
};

export default DialogStyled;

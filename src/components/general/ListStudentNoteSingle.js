import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';

const ListStudentNoteSingle = (props) => {
	const [open, setOpen] = useState(false);

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const getDateString = (dateString) => {
		const date = new Date(dateString);
		let dd = date.getDate();
		let mm = date.getMonth() + 1;
		const yyyy = date.getFullYear();
		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;
		return dd + '/' + mm + '/' + yyyy;
	};

	const getContent = (content) => {
		if (content.length > 40) {
			return content.substring(0, 37) + '...';
		}
		return content;
	};

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const useStyles = makeStyles((theme) => ({
		paper: {
			minWidth: 500,
			width: '100%',
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),
			paddingTop: theme.spacing(5),
			paddingBottom: theme.spacing(5),
			[theme.breakpoints.down('sm')]: {
				minWidth: 0,
			},
		},
		closeIcon: {
			position: 'absolute',
			bottom: 0,
			right: 0,
			marginRight: theme.spacing(5),
			marginBottom: theme.spacing(5),
		},
	}));
	const classes = useStyles();

	const getFab = () => {
		if (fullScreen) {
			return (
				<Fab
					aria-label="close"
					color="secondary"
					className={classes.closeIcon}
					onClick={() => setOpen(false)}
				>
					<CloseIcon color="primary" />
				</Fab>
			);
		}
	};

	const handleViewPoint = (pointid) => {
		document.location.href = '/point?pointid=' + pointid;
	};

	return (
		<div>
			<ListItem button onClick={() => handleClick()}>
				<ListItemText
					primary={props.title}
					secondary={getContent(props.content)}
				/>
				<ListItemText
					align="right"
					primary={getDateString(props.datetime)}
				/>
			</ListItem>
			<Divider />
			<Dialog
				onClose={handleClose}
				open={open}
				fullScreen={fullScreen}
				classes={{ paper: classes.paper }}
			>
				<Typography variant="h2" align="center">
					{props.title}
				</Typography>
				<Typography variant="body2" align="left">
					{props.content}
				</Typography>
				<br></br>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => handleViewPoint(props.pointid)}
				>
					View Point
				</Button>
				{getFab()}
			</Dialog>
		</div>
	);
};
export default ListStudentNoteSingle;

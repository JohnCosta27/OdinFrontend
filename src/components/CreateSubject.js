import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MenuItem } from '@material-ui/core';

const CreateSubject = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [open, setOpen] = useState(false);
	const [subjectName, setSubjectName] = useState();
	const [examboard, setExamboard] = useState();
	const [level, setLevel] = useState('');

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const useStyles = makeStyles((theme) => ({
		paper: {
			minWidth: 500,
		},
		dialogWrapper: {
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
			display: 'flex',
			flexDirection: 'column',
		},
		formComponent: {
			marginBottom: theme.spacing(5),
			marginTop: theme.spacing(5),
			width: '100%',
		},
        submitButton: {
            width: '100%'
        }
	}));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		setLevel(event.target.value);
	};

	const submitSubject = async () => {
		const token = await getAccessTokenSilently();
		const body = {
			name: subjectName,
			examboard: examboard,
			level: level,
		};

		const data = await fetch(`${serverUrl}/subjects/create`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const responseData = await data.json();
        if (responseData.error != undefined) {

        } else {
            setOpen(false);
        }
	};

	const classes = useStyles();

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				onClick={handleClickOpen}
			>
				Create subject
			</Button>
			<Dialog
				onClose={handleClose}
				open={open}
				classes={{ paper: classes.paper }}
				fullScreen={fullScreen}
			>
				<DialogTitle align="center">Create subject</DialogTitle>
				<DialogContent className={classes.dialogWrapper}>
					<form onSubmit={submitSubject}>
						<FormControl
							className={classes.formComponent}
							required
							onChange={(event) =>
								setSubjectName(event.target.value)
							}
						>
							<InputLabel id="subject-name">
								Subject name
							</InputLabel>
							<Input labelId="subject-name" />
						</FormControl>
						<FormControl
							className={classes.formComponent}
							required
							onChange={(event) =>
								setExamboard(event.target.value)
							}
						>
							<InputLabel id="examboard">Exam board</InputLabel>
							<Input labelId="examboard" />
						</FormControl>
						<FormControl className={classes.formComponent} required>
							<InputLabel id="level-select">Level</InputLabel>
							<Select
								labelId="label-select"
								className={classes.formComponent}
								value={level}
								onChange={handleChange}
							>
								<MenuItem value="GCSE">GCSE</MenuItem>
								<MenuItem value="A-level">A-level</MenuItem>
							</Select>
						</FormControl>
						<Button color="secondary" type="submit" className={classes.formComponent}>
							Create
						</Button>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CreateSubject;

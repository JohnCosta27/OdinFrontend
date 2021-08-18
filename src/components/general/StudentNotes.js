import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';
import ContentCard from './ContentCard';
import DialogStyled from './DialogStyled';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import SubjectTopicPointForm from '../subjects/SubjectTopicPointForm';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';
import ListStudentNotes from './ListStudentNotes';

const StudentNotes = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	//* State to be used for submit and passed down to child
	const [subject, setSubject] = useState('');
	const [topic, setTopic] = useState('');
	const [newTopic, setNewTopic] = useState();
	const [points, setPoints] = useState([]);
	const [selectedPoints, setSelectedPoints] = useState([]);

	const useStyles = makeStyles((theme) => ({
		formComponent: {
			marginBottom: theme.spacing(2),
			marginTop: theme.spacing(2),
			width: '100%',
		},
	}));
	const classes = useStyles();

	useEffect(() => {
		if (topic != '') {
			getPoints();
		}
	}, [topic]);

	const getPoints = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/subjects/getpoints?topicid=` + topic, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		setPoints(responseData);
	};

	const getPointsSelect = () => {
		if (points.length != 0) {
			return (
				<FormControl required style={{ width: '100%' }}>
					<InputLabel id="topic-select">Points</InputLabel>
					<Select labelId="topic-select" value={selectedPoints} onChange={handlePointSelect} multiple>
						{points.map((points) => (
							<MenuItem key={points.id} value={points.id}>
								{points.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			);
		}
	};

	const handlePointSelect = (event) => {
		setSelectedPoints(event.target.value);
	};

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	}

	const handleContentChange = (event) => {
		setContent(event.target.value);
	}

	const submitNote = async (event) => {

		event.preventDefault();
		const token = await getAccessTokenSilently();
		const body = {
			title: title,
			content: content,
			points: selectedPoints
		};
		const data = await fetch(`${serverUrl}/usercontent/createnote`, {
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
			setSubject('');
			setTopic(0);
		}

	}

	return (
		<ContentCard>
			<Typography variant="h2" align="center">
				Your Notes
			</Typography>
			<ListStudentNotes />
			<DialogStyled
				buttonTitle="Create Note"
				title="Create Note"
				setOpen={setOpen}
				open={open}
				submitTitle="Create"
				onSubmit={submitNote}
			>
				<FormControl required className={classes.formComponent}>
					<TextField
						label="Title"
						onChange={handleTitleChange}
					></TextField>
				</FormControl>
				<FormControl required className={classes.formComponent}>
					<TextField
						label="Content"
						onChange={handleContentChange}
						multiline
						rows={6}
						variant="outlined"
					></TextField>
				</FormControl>
				<SubjectTopicPointForm
					state={{
						subject: subject,
						setSubject: setSubject,
						topic: topic,
						setTopic: setTopic,
						newTopic: newTopic,
						setNewTopic: setNewTopic,
					}}
					studentSubjects={true}
				/>
				{getPointsSelect()}
			</DialogStyled>
		</ContentCard>
	);
};
export default StudentNotes;

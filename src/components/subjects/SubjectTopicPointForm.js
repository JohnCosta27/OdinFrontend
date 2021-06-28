import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

const SubjectTopicPointForm = (props) => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [loading, setLoading] = useState(true);
	const [subjects, setSubjects] = useState();
	const [topics, setTopics] = useState();
	const [subjectLoading, setSubjectLoading] = useState(true);

	useEffect(() => {
		getSubjects();
	}, []);

	useEffect(() => {
		if (props.state.subject != '') {
			getTopics();
		}
	}, [props.state.subject]);

	const useStyles = makeStyles((theme) => ({
		formComponent: {
			marginBottom: theme.spacing(5),
			marginTop: theme.spacing(5),
			width: '100%',
		},
	}));

	const getSubjects = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/subjects/getall`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		setSubjects(responseData);
		setLoading(false);
	};

	const getTopics = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(
			`${serverUrl}/subjects/getalltopics?subjectid=` +
				props.state.subject,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const responseData = await data.json();
		setTopics(responseData);
		setSubjectLoading(false);
	};

	const getNewTopic = () => {
		if (props.state.topic == 1) {
			return (
				<FormControl required className={classes.formComponent}>
					<TextField
						label="New topic"
						onChange={selectNewTopic}
					></TextField>
				</FormControl>
			);
		}
	};

	const getTopicInput = () => {
		if (props.state.subject == '') {
			return <div></div>;
		} else if (props.state.subject != '' && subjectLoading) {
			return (
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<CircularProgress />
				</div>
			);
		} else {
			if (props.newTopic) {
				return (
					<FormControl required style={{ width: '100%' }}>
						<InputLabel id="topic-select">Topic</InputLabel>
						<Select
							labelId="subject-select"
							value={props.state.topic}
							onChange={selectTopic}
						>
							<MenuItem key={1} value={1}>
								+ New Topic
							</MenuItem>
							{topics.map((topic) => (
								<MenuItem key={topic.id} value={topic.id}>
									{topic.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				);
			} else {
				return (
					<FormControl required style={{ width: '100%' }}>
						<InputLabel id="topic-select">Topic</InputLabel>
						<Select
							labelId="subject-select"
							value={props.state.topic}
							onChange={selectTopic}
						>
							{topics.map((topic) => (
								<MenuItem key={topic.id} value={topic.id}>
									{topic.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				);
			}
		}
	};

	const selectSubject = (event) => {
		props.state.setSubject(event.target.value);
	};

	const selectTopic = (event) => {
		props.state.setTopic(event.target.value);
	};

	const selectNewTopic = (event) => {
		props.state.setNewTopic(event.target.value);
	};

	const classes = useStyles();

	return (
		<div className={classes.formComponent}>
			{loading ? (
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<CircularProgress />
				</div>
			) : (
				<div className={classes.formComponent}>
					<FormControl required style={{ width: '100%' }}>
						<InputLabel id="subject-select">Subject</InputLabel>
						<Select
							labelId="subject-select"
							value={props.state.subject}
							onChange={selectSubject}
						>
							{subjects.map((subject) => (
								<MenuItem key={subject.id} value={subject.id}>
									{subject.level} - {subject.name} (
									{subject.examboard})
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			)}
			{getTopicInput()}
			{getNewTopic()}
		</div>
	);
};

export default SubjectTopicPointForm;

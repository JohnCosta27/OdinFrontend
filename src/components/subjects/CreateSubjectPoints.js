import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem } from '@material-ui/core';
import DialogStyled from '../general/DialogStyled';
import CircularProgress from '@material-ui/core/CircularProgress';

const CreateSubjectPoints = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [subjects, setSubjects] = useState();
	const [topics, setTopics] = useState();
	const [points, setPoints] = useState();

	const [subject, setSubject] = useState('');
	const [topic, setTopic] = useState('');

	const [subjectLoading, setSubjectLoading] = useState(true);

	useEffect(() => {
		getSubjects();
	}, []);

	useEffect(() => {
		if (subject != '') {
			getTopics();
		}
	}, [subject]);

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
			`${serverUrl}/subjects/getalltopics?subjectid=` + subject,
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

	const getTopicInput = () => {
		if (subject == '') {
			return <div></div>;
		} else if (subject != '' && subjectLoading) {
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
			return (
				<FormControl required style={{ width: '100%' }}>
					<InputLabel id="topic-select">Topic</InputLabel>
					<Select
						labelId="subject-select"
						value={topic}
						onChange={selectTopic}
					>
                        <MenuItem key={1} value={1}>+ New Topic</MenuItem>
						{topics.map((topic) => (
							<MenuItem key={topic.id} value={topic.id}>
								{topic.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			);
		}
	};

    const getNewTopic = () => {
        if (topic == 1) {
            return (
                <FormControl required style={{width: '100%'}}>
                    <TextField label="New topic"></TextField>
                </FormControl>
            );
        }
    }

	const getPointInput = () => {
		if (topic != '') {
			return (
				<FormControl
					required
					style={{ width: '100%' }}
					onChange={(event) => setPoints(event.target.value)}
				>
					<TextField
						label="Points"
						variant="outlined"
						multiline
						rows={4}
						helperText="Each line is a point"
					></TextField>
				</FormControl>
			);
		}
	};

	const selectSubject = (event) => {
		setSubject(event.target.value);
	};

	const selectTopic = (event) => {
		setTopic(event.target.value);
	};

    const submitPoints = async (event) => {
        event.preventDefault();
		const token = await getAccessTokenSilently();
		const body = {
            subject: subject,
            topic: topic,
			points: points
		};

		const data = await fetch(`${serverUrl}/subjects/createpoints`, {
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
    }

	return (
		<div>
			<DialogStyled
				buttonTitle="Create subject points"
				title="Create subject points"
				setOpen={setOpen}
				open={open}
				onSubmit={submitPoints}
				submitTitle="Create"
			>
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
					<div>
						<FormControl required style={{ width: '100%' }}>
							<InputLabel id="subject-select">Subject</InputLabel>
							<Select
								labelId="subject-select"
								value={subject}
								onChange={selectSubject}
							>
								{subjects.map((subject) => (
									<MenuItem
										key={subject.id}
										value={subject.id}
									>
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
                {getPointInput()}
                
			</DialogStyled>
		</div>
	);
};

export default CreateSubjectPoints;

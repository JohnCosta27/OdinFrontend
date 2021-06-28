import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem } from '@material-ui/core';
import DialogStyled from '../general/DialogStyled';
import CircularProgress from '@material-ui/core/CircularProgress';
import SubjectTopicPointForm from './SubjectTopicPointForm';

const CreateSubjectPoints = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [open, setOpen] = useState(false);
	const [points, setPoints] = useState([]);

	//* State to be used for submit and passed down to child
	const [subject, setSubject] = useState('');
	const [topic, setTopic] = useState('');
	const [newTopic, setNewTopic] = useState();

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

	const submitPoints = async (event) => {
		event.preventDefault();
		const token = await getAccessTokenSilently();
		const body = {
			subject: subject,
			topic: topic,
			newTopic: newTopic,
			points: points,
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
			setError(true);
		} else {
			setOpen(false);
			setSubject('');
			setTopic(0);
		}
	};

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
				<SubjectTopicPointForm
					state={{
						subject: subject,
						setSubject: setSubject,
						topic: topic,
						setTopic: setTopic,
						newTopic: newTopic,
						setNewTopic: setNewTopic,
					}}
					newTopic={true}
				/>
				{getPointInput()}
			</DialogStyled>
		</div>
	);
};

export default CreateSubjectPoints;

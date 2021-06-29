import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import DialogStyled from '../general/DialogStyled';
import SubjectTopicPointForm from '../subjects/SubjectTopicPointForm';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const AddProgress = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [open, setOpen] = useState(false);
	const [points, setPoints] = useState('');
	const [selectedPoints, setSelectedPoints] = useState([]);

	useEffect(() => {
		if (topic != '') {
			getPointsFromTopic();
		}
	});

	//* State to be used for submit and passed down to child
	const [subject, setSubject] = useState('');
	const [topic, setTopic] = useState('');

	const getPointsFromTopic = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(
			`${serverUrl}/subjects/getpoints?topicid=` + topic,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const responseData = await data.json();
		setPoints(responseData);
	};

	const getPoints = () => {
		if (points != '') {
			return (
				<FormControl required style={{ width: '100%' }}>
					<InputLabel id="topic-select">Points</InputLabel>
					<Select
						labelId="topic-select"
						value={selectedPoints}
						onChange={handlePointSelect}
						multiple
					>
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

	const handlePointSelect = async (event) => {
		setSelectedPoints(event.target.value);
	};

	const submitProgress = async (event) => {
		event.preventDefault();
		const token = await getAccessTokenSilently();
		const body = {
			points: selectedPoints
		};

		const data = await fetch(`${serverUrl}/progress/add`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const responseData = await data.json();
		console.log(responseData);
		if (responseData.error != undefined) {
		} else {
			setOpen(false);
		}
	};

	return (
		<div>
			<DialogStyled
				buttonTitle="Add Progress"
				title="Add Progress"
				setOpen={setOpen}
				open={open}
				onSubmit={submitProgress}
				submitTitle="Create"
			>
				<SubjectTopicPointForm
					state={{
						subject: subject,
						setSubject: setSubject,
						topic: topic,
						setTopic: setTopic,
					}}
				/>
				{getPoints()}
			</DialogStyled>
		</div>
	);
};

export default AddProgress;

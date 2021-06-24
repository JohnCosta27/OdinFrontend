import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem } from '@material-ui/core';
import DialogStyled from '../general/DialogStyled';

const CreateSubject = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [open, setOpen] = useState(false);
	const [subjectName, setSubjectName] = useState();
	const [examboard, setExamboard] = useState();
	const [level, setLevel] = useState('');

	const handleChange = (event) => {
		setLevel(event.target.value);
	};

	const submitSubject = async (event) => {

		event.preventDefault();
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

	return (
		<div>
			<DialogStyled
				buttonTitle="Create subject"
				title="Create subject"
				setOpen={setOpen}
				open={open}
				onSubmit={submitSubject}
				submitTitle="Create"
			>
				<FormControl
					required
					style={{ width: '100%' }}
					onChange={(event) => setSubjectName(event.target.value)}
				>
					<InputLabel id="subject-name">Subject name</InputLabel>
					<Input labelid="subject-name" />
				</FormControl>
				<FormControl
					required
					style={{ width: '100%' }}
					onChange={(event) => setExamboard(event.target.value)}
				>
					<InputLabel id="examboard">Exam board</InputLabel>
					<Input labelid="examboard" />
				</FormControl>
				<FormControl required style={{ width: '100%' }}>
					<InputLabel id="level-select">Level</InputLabel>
					<Select
						labelId="label-select"
						value={level}
						onChange={handleChange}
					>
						<MenuItem value="GCSE">GCSE</MenuItem>
						<MenuItem value="A-level">A-level</MenuItem>
					</Select>
				</FormControl>
			</DialogStyled>
		</div>
	);
};

export default CreateSubject;

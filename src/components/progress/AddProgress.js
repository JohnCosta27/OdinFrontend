import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MenuItem } from '@material-ui/core';
import DialogStyled from '../general/DialogStyled';

/*const AddProgress = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [open, setOpen] = useState(false);
	const [subjects, setSubjects] = useState();

	useEffect(() => {
		getSubjects();
	}, []);

	const submitProgress = async (event) => {

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
				buttonTitle="Add Progress"
				title="Add Progress"
				setOpen={setOpen}
				open={open}
				onSubmit={submitProgress}
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
			</DialogStyled>
		</div>
	);
};

export default AddProgress;*/

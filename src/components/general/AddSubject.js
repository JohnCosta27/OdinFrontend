import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import DialogStyled from './DialogStyled';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const AddSubject = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [open, setOpen] = useState(false);
	const [subjects, setSubjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedSubject, setSelectedSubject] = useState("");

	useEffect(() => {
		getSubjects();
	}, []);

	const getSubjects = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/subjects/getnew`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		setSubjects(responseData);
		setLoading(false);
	};

	const submit = async (event) => {
		event.preventDefault();
		const token = await getAccessTokenSilently();
		//TODO
	}

	const selectSubject = (event) => {
		setSelectedSubject(event.target.value);
	};

	const getSubjectSelect = () => {
		if (loading) {
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<CircularProgress />
			</div>;
		} else {
			return (
				<FormControl required style={{ width: '100%' }}>
					<InputLabel id="subject-select">Subject</InputLabel>
					<Select
						labelId="subject-select"
						value={selectedSubject}
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
			);
		}
	};

	return (
		<DialogStyled
			buttonTitle="Add Subject"
            title="Add Subject"
			submitTitle="Add"
			open={open}
			setOpen={setOpen}
			onSubmit={submit}
		>
			{getSubjectSelect()}
		</DialogStyled>
	);
};
export default AddSubject;

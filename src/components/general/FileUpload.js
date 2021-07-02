import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

import ContentCard from './ContentCard';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const FileUpload = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();
	const urlParams = new URLSearchParams(window.location.search);

	const [selectedFile, setSelectedFile] = useState();

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmission = async () => {
		const formData = new FormData();

		formData.append('note', selectedFile);
		formData.append('pointid', urlParams.get('pointid'));
		const token = await getAccessTokenSilently();

		const data = await fetch(`${serverUrl}/files/upload`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
			},
			body: formData,
		});
		const responseData = await data.json();
		console.log(responseData);
	};

	return (
		<ContentCard>
			<Typography variant="h2" align="center">
				Upload Note
			</Typography>

			<label htmlFor="btn-upload">
				<input
					id="btn-upload"
					name="btn-upload"
					style={{ display: 'none' }}
					type="file"
					onChange={changeHandler}
				/>
				<Button
					className="btn-choose"
					variant="contained"
					color="secondary"
					component="span"
				>
					Choose Files
				</Button>
			</label>

			<Button variant="text" color="secondary" onClick={handleSubmission}>
				Submit
			</Button>
		</ContentCard>
	);
};
export default FileUpload;

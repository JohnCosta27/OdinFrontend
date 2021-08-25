import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import Gallery from 'react-grid-gallery';
import ContentCard from './ContentCard';
import { Typography } from '@material-ui/core';
const ContentNotes = () => {
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getNotes();
	}, []);

	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			flexDirection: 'column',
			flexWrap: 'wrap',
			justifyContent: 'center',
			overflow: 'hidden',
			width: 750,
		},
		imageWrapper: {
			height: 'auto',
			width: '100%',
		},
		image: {
			width: '100%',
			height: 'auto',
		},
	}));

	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();
	const urlParams = new URLSearchParams(window.location.search);

	const getNotes = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(
			`${serverUrl}/files/getnotes?pointid=` + urlParams.get('pointid'),
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: 'application/json',
				},
			}
		);
		const responseData = await data.json();
		let noteData = [];
		for (let note of responseData) {
			noteData.push({
				src: `https://sbogvmcjtjrgffqnydly.supabase.co/storage/v1/object/public/notes/${note.noteid}`,
				thumbnail: `https://sbogvmcjtjrgffqnydly.supabase.co/storage/v1/object/public/notes/${note.noteid}`,
				thumbnailWidth: note.notes.width,
				thumbnailHeight: note.notes.height,
			});
		}
		setNotes(noteData);
		setLoading(false);
	};

	const classes = useStyles();

	if (loading || notes.length == 0) {
		return <div></div>;
	} else {
		return (
			<ContentCard>
				<Typography variant="h2" align="center">
					Revision Material
				</Typography>
				<Gallery
					images={notes}
					enableImageSelection={false}
					rowHeight={300}
				/>
			</ContentCard>
		);
	}
};

export default ContentNotes;

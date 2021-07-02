import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

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
			justifyContent: 'space-around',
			overflow: 'hidden',
			width: '80%',
		},
		imageWrapper: {
			height: 'auto',
			width: '100%',
		},
		image: {
			width: '100%',
			height: 'auto'
		}
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
		setNotes(responseData);
		setLoading(false);
	};

	const classes = useStyles();

	if (loading) {
		return <div></div>;
	} else {
		return (
			<div className={classes.root}>
				{notes.map((note) => (
					<div key={note.noteid} className={classes.imageWrapper}>
						<img src={`https://sbogvmcjtjrgffqnydly.supabase.co/storage/v1/object/public/notes/${note.noteid}`} className={classes.image} />
					</div>
				))}
			</div>
		);
	}
};

export default ContentNotes;

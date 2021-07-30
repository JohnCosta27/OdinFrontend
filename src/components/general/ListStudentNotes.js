import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ListStudentNotes = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [usernotes, setUsernotes] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getUserNotes();
	}, []);

	const getUserNotes = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/usercontent/getusernotes`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		console.log(responseData);
		setUsernotes(responseData);
		setLoading(false);
	};

	const getDateString = (dateString) => {
		const date = new Date(dateString);
		let dd = date.getDate();
		let mm = date.getMonth() + 1;
		const yyyy = date.getFullYear();
		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;
		return dd + '/' + mm + '/' + yyyy;
	};

    const getContent = (content) => {
        if (content.length > 40) {
            return content.substring(0, 37) + "...";
        }
        return content;
    }

	return (
		<List>
			{usernotes.map((note) => (
				<ListItem key={note.id}>
					<ListItemText
						primary={note.text_notes.title}
						secondary={getContent(note.text_notes.content)}
					/>
					<ListItemText
						align="right"
						primary={getDateString(note.text_notes.datetime)}
					/>
				</ListItem>
			))}
		</List>
	);
};
export default ListStudentNotes;

import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import List from '@material-ui/core/List';
import ListStudentNoteSingle from './ListStudentNoteSingle';

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
		setUsernotes(responseData);
		setLoading(false);
	};

	return (
		<List>
			{usernotes.map((note) => (
				<div key={note.id}>
				<ListStudentNoteSingle
					title={note.title}
					content={note.content}
					datetime={note.datetime}
					pointid={note.pointid}
				/>
				</div>
			))}
		</List>
	);
};
export default ListStudentNotes;

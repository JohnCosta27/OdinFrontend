import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ContentCard from './ContentCard';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const StudentList = (props) => {
    const { getAccessTokenSilently } = useAuth0();
	const serverUrl = process.env.REACT_APP_SERVER_URL;

	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllUsers();
	}, []);

	const getAllUsers = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/users/getall`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		setUsers(responseData);
		setLoading(false);
	};

	if (loading) {
		return (
			<ContentCard>
				<CircularProgress />
			</ContentCard>
		);
	} else {
		return (
			<ContentCard>
                <Typography variant="h2" align="center">
                    User List
                </Typography>
				<List>
                    {users.map((user) => (
                        <ListItem key={user.user_id}>
                            <ListItemText primary={user.email} />
                        </ListItem>
                ))}
                </List>
			</ContentCard>
		);
	}
};
export default StudentList;

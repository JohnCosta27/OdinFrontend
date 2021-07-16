import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ViewWrapper from '../general/ViewWrapper';
import Grid from '@material-ui/core/Grid';
import GridItem from '../general/GridItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const User = () => {
	const { getAccessTokenSilently } = useAuth0();
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const urlParams = new URLSearchParams(window.location.search);

	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getUser();
	}, []);

	const getUser = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/progress/getuserprogress?studentid=` + urlParams.get('studentid'), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		setUser(responseData);
		setLoading(false);
	};

	return (
		<ViewWrapper>
			<Grid container spacing={3}>
				<GridItem md={4} xs={12}>
					
				</GridItem>
				<GridItem md={4} xs={12}>
					
				</GridItem>
				<GridItem md={4} xs={12}>
					
				</GridItem>
			</Grid>
		</ViewWrapper>
	);
};
export default User;

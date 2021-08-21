import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ViewWrapper from '../general/ViewWrapper';
import Grid from '@material-ui/core/Grid';
import GridItem from '../general/GridItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ContentCard from '../general/ContentCard';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
		const data = await fetch(
			`${serverUrl}/progress/getuserprogress?studentid=` +
				urlParams.get('studentid'),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const responseData = await data.json();
		console.log(responseData);
		setUser(responseData);
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

	const handleClick = (pointid) => {
		document.location.href = '/point?pointid=' + pointid;
	};

	if (loading) {
		return (
			<ViewWrapper>
				<CircularProgress />
			</ViewWrapper>
		);
	} else {
		return (
			<ViewWrapper>
				<ContentCard>
					<Typography variant="h2" align="center">
						{urlParams.get('email')}
					</Typography>
				</ContentCard>
				<Grid container spacing={3}>
					<GridItem md={4} xs={12}>
						<ContentCard>
							<List>
								{user.map((point) => (
									<ListItem
										key={point.id}
										button
										onClick={() =>
											handleClick(point.points_id)
										}
									>
										<ListItemText
											secondary={
												point.points.topics.subjects
													.level +
												' ' +
												point.points.topics.subjects
													.name +
												' (' +
												point.points.topics.subjects
													.examboard +
												') - ' +
												point.points.topics.name
											}
											primary={point.points.name}
										/>
										<ListItemText
											align="right"
											primary={getDateString(
												point.datetime
											)}
										/>
									</ListItem>
								))}
							</List>
						</ContentCard>
					</GridItem>
					<GridItem md={4} xs={12}></GridItem>
					<GridItem md={4} xs={12}></GridItem>
				</Grid>
			</ViewWrapper>
		);
	}
};
export default User;

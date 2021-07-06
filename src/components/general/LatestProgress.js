import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import ContentCard from './ContentCard';

const LatestProgress = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [learntPoints, setLearntPoints] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loading) getProgress();
	}, []);

	const getProgress = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/progress/get`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		await responseData.sort((a, b) => {
			return new Date(b.datetime) - new Date(a.datetime);
		});
		setLearntPoints(responseData);
		setLoading(false);
	};

	const getDateString = (dateString) => {
		const date = new Date(dateString);
		let dd = date.getDate();
		let mm = date.getMonth() + 1;
		const yyyy = date.getFullYear();
		if (dd < 10) dd = '0' + dd
		if (mm < 10) mm = '0' + mm
		return (dd + "/" + mm + "/" + yyyy);
	}

	const handleClick = (pointid) => {
		document.location.href = '/point?pointid=' + pointid;
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
					Latest Learnt
				</Typography>
				<List>
					{learntPoints.map((point) => (
						<div key={point.points_id}>
							<ListItem
								button
								onClick={() => handleClick(point.points_id)}
							>
								<ListItemText
									primary={
										point.points.topics.subjects.level +
										' ' +
										point.points.topics.subjects.name +
										' (' +
										point.points.topics.subjects.examboard +
										') - ' +
										point.points.topics.name
									}
									secondary={point.points.name}
								/>
								<ListItemText align="right" primary={getDateString(point.datetime)}/>
							</ListItem>
							<Divider />
						</div>
					))}
				</List>
			</ContentCard>
		);
	}
};
export default LatestProgress;

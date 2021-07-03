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

	const handleClick = (pointid) => {
		document.location.href = "/point?pointid=" + pointid;
	}

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
				{learntPoints.map((point) => (
					<List key={point.points_id}>
						<ListItem button onClick={() => handleClick(point.points_id)}>
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
						</ListItem>
						<Divider />
					</List>
				))}
			</ContentCard>
		);
	}
};
export default LatestProgress;

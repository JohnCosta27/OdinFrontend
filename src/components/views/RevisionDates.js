import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ContentCard from '../general/ContentCard';
import ViewWrapper from '../general/ViewWrapper';

const RevisionDates = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [loading, setLoading] = useState(true);
	const [points, setPoints] = useState([]);

	useEffect(() => {
		getRevisionPoints();
	}, []);

	const getDateString = (dateString) => {
		const date = new Date(dateString);
		let dd = date.getDate();
		let mm = date.getMonth() + 1;
		const yyyy = date.getFullYear();
		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;
		return dd + '/' + mm + '/' + yyyy;
	};

	const getRevisionPoints = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/progress/get`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		let results = await responseData.sort((a, b) => {
			return new Date(b.datetime) - new Date(a.datetime);
		});
		setPoints(results);
		setLoading(false);
	};

	const handleClick = (pointid) => {
		document.location.href = '/point?pointid=' + pointid;
	};

	return (
		<ViewWrapper>
			<ContentCard small>
				<Typography variant="h2" align="center">
					Revision Points Achieved
				</Typography>
				<List>
					{points.map((point) => (
						<ListItem key={point.id} button onClick={() => handleClick(point.points_id)}>
							<ListItemText
								primary={point.points.name}
								secondary={point.points.topics.subjects.level + ' ' + point.points.topics.subjects.name}
							/>
							<ListItemText align="right" primary={getDateString(point.datetime)} />
						</ListItem>
					))}
				</List>
			</ContentCard>
		</ViewWrapper>
	);
};
export default RevisionDates;

import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import ContentCard from '../general/ContentCard';
import Divider from '@material-ui/core/Divider';
import ViewWrapper from '../general/ViewWrapper';
import FileUpload from '../general/FileUpload';
import ContentNotes from '../general/ContentNotes';
import RevisionPoint from '../general/RevisionPoint';

const Point = () => {
	const [point, setPoint] = useState([]);
	const [loading, setLoading] = useState(true);

	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();
	const urlParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		getPoint();
	}, []);

	const getPoint = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(
			`${serverUrl}/subjects/getpointrevision?pointid=` +
				urlParams.get('pointid'),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const responseData = await data.json();
		await responseData.sort((a, b) => {
			return new Date(b.datetime) - new Date(a.datetime);
		});
		if (responseData.error != undefined) {
			document.location.href = '/';
		}
		setPoint(responseData);
		setLoading(false);
	};

	const getDates = (point) => {
		let dates = [];
		for (let p of point) {
			dates.push(p.datetime);
		}
		return dates;
	}

	if (loading) {
		return <CircularProgress />;
	} else {
		return (
			<ViewWrapper>
				<ContentCard>
					<Typography variant="h2" align="center">
						{point[0].topicname}
					</Typography>
					<Divider />
					<Typography variant="h4" align="center">
						{point[0].pointname}
					</Typography>
				</ContentCard>
				<RevisionPoint
					timesRevised={point.length}
					lastRevised={point[0].datetime}
					dates={getDates(point)}
				/>
				<ContentNotes />
			</ViewWrapper>
		);
	}
};
export default Point;

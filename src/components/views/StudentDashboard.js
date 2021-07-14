import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LatestProgress from '../general/LatestProgress';
import ViewWrapper from '../general/ViewWrapper';
import StudentSubjects from '../general/StudentSubjects';
import AddProgress from '../progress/AddProgress';
import StudentRevision from '../general/StudentRevision';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import GridItem from '../general/GridItem';

const StudentDashboard = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [totalLearnt, setTotalLearnt] = useState([]);
	const [learntPoints, setLearntPoints] = useState([]);
	const [loading, setLoading] = useState(true);
	const [newRevised, setNewRevised] = useState(false);

	useEffect(() => {
		getProgress();
	}, []);

	useEffect(() => {
		if (newRevised) {
			getProgress();
		}
	}, [newRevised]);

	const getProgress = async () => {
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
		setTotalLearnt(results);
		if (responseData.length > 5) {
			setLearntPoints(results.slice(0, 5));
		} else {
			setLearntPoints(results);
		}
		setLoading(false);
		setNewRevised(false);
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
				<Grid container spacing={3}>
					<GridItem lg={4} md={6} xs={12}>
						<LatestProgress points={learntPoints} loading={loading} />
					</GridItem>
					<GridItem lg={4} md={6} xs={12}>
						<StudentSubjects />
					</GridItem>
					<GridItem lg={4} md={12} xs={12}>
						<StudentRevision setNewRevised={setNewRevised} points={totalLearnt} />
					</GridItem>
				</Grid>
			</ViewWrapper>
		);
	}
};

export default StudentDashboard;

import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TopicTable from '../TopicTable';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ContentCard from '../general/ContentCard';
import Grid from '@material-ui/core/Grid';
import GridItem from '../general/GridItem';
import ViewWrapper from '../general/ViewWrapper';
import jwtDecode from 'jwt-decode';
import Button from '@material-ui/core/Button'
import CreateSubjectPoints from '../subjects/CreateSubjectPoints';

const Subject = () => {
	const [admin, setAdmin] = useState(false);
	const [topics, setTopics] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pointsProgress, setPointsProgress] = useState([]);
	const [progressOnly, setProgressOnly] = useState(false);

	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();
	const urlParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		getSubject();
		getPointsProgress();
		checkAdmin();
	}, []);

	const checkAdmin = async () => {
		const token = await getAccessTokenSilently();
		const jwt = jwtDecode(token);
		if (jwt.permissions.includes('role:admin')) {
			setAdmin(true);
		}
	};

	const getSubject = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/subjects/get?subjectid=` + urlParams.get('subjectid'), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		setTopics(responseData);
		setLoading(false);
	};

	const getPointsProgress = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/progress/getprogressinsubject?subjectid=` + urlParams.get('subjectid'), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		setPointsProgress(responseData);
	};

	const topicTables = (topic) => {
		for (let progress of pointsProgress) {
			if (progress.topicid == topic.id) {
				return (
					<GridItem key={topic.id} lg={4} md={6} xs={12}>
						<TopicTable rows={topic} progress={progress} showProgressOnly={progressOnly} />
					</GridItem>
				);
			}
		}

		return (
			<GridItem key={topic.id} lg={4} md={6} xs={12}>
				<TopicTable rows={topic} showProgressOnly={progressOnly} />
			</GridItem>
		);
	};

	const onChangeView = () => {
		setProgressOnly(!progressOnly);
	};

	if (loading) {
		return (
			<ViewWrapper>
				<CircularProgress />
			</ViewWrapper>
		);
	} else {
		if (admin) {
			return (
				<ViewWrapper>
					<Typography variant="h2" align="center">
						{topics[0].subjects.level} {topics[0].subjects.name} ({topics[0].subjects.examboard})
					</Typography>
					<ContentCard>
						<CreateSubjectPoints />
					</ContentCard>
					<Grid container spacing={3}>
						{topics.map((topic) => topicTables(topic))}
					</Grid>
				</ViewWrapper>
			);
		} else {
			return (
				<ViewWrapper>
					<Typography variant="h2" align="center">
						{topics[0].subjects.level} {topics[0].subjects.name} ({topics[0].subjects.examboard})
					</Typography>
					<ContentCard>
						<FormControlLabel
							control={<Checkbox onChange={onChangeView} value={progressOnly} name="progress-button" />}
							label="Show Progress Only"
						/>
					</ContentCard>
					<Grid container spacing={3}>
						{topics.map((topic) => topicTables(topic))}
					</Grid>
				</ViewWrapper>
			);
		}
	}
};

export default Subject;

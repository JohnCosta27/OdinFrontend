import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TopicTable from '../TopicTable';
import Typography from '@material-ui/core/Typography';

const Subject = () => {
	const [topics, setTopics] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pointsProgress, setPointsProgress] = useState([]);

	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();
	const urlParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		getSubject();
		getPointsProgress();
	}, []);

	const getSubject = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(
			`${serverUrl}/subjects/get?subjectid=` + urlParams.get('subjectid'),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const responseData = await data.json();
		setTopics(responseData);
		setLoading(false);
	};

	const getPointsProgress = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(
			`${serverUrl}/progress/getprogressinsubject?subjectid=` +
				urlParams.get('subjectid'),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const responseData = await data.json();
		setPointsProgress(responseData);
	};

	const topicTables = (topic) => {
		for (let progress of pointsProgress) {
			if (progress.topicid == topic.id) {
				return (
					<div key={topic.id}>
						<TopicTable rows={topic} progress={progress} />
					</div>
				);
			}
		}

		return (
			<div key={topic.id}>
				<TopicTable rows={topic} />
			</div>
		);
	};

	if (loading) {
		return (
			<div>
				<CircularProgress />
			</div>
		);
	} else {
		return (
			<div>
				<Typography variant="h2" align="center">
					{topics[0].subjects.level} {topics[0].subjects.name} (
					{topics[0].subjects.examboard})
				</Typography>
				{topics.map((topic) => topicTables(topic))}
			</div>
		);
	}
};

export default Subject;

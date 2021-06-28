import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TopicTable from '../TopicTable';
import Typography from '@material-ui/core/Typography';

const Subject = () => {
	const [topics, setTopics] = useState();
	const [loading, setLoading] = useState(true);

	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();
	const urlParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		getSubject();
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
				{topics.map((topic) => (
					<div key={topic.id}>
						<TopicTable rows={topic} />
						<br></br>
						<br></br>
						<br></br>
					</div>
				))}
			</div>
		);
	}
};

export default Subject;

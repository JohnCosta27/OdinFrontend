import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TopicTable from '../TopicTable';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ContentCard from '../general/ContentCard';

const Subject = () => {
	const [topics, setTopics] = useState([]);
	const [loading, setLoading] = useState(true);
	const [pointsProgress, setPointsProgress] = useState([]);
	const [progressOnly, setProgressOnly] = useState(false);

	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();
	const urlParams = new URLSearchParams(window.location.search);

	const useStyles = makeStyles((theme) => ({
		root: {
			width: 1000,
			[theme.breakpoints.down('sm')]: {
				width: '100%',
			},
		},
	}));

	useEffect(() => {
		getSubject();
		getPointsProgress();
	}, []);

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
					<div key={topic.id}>
						<TopicTable rows={topic} progress={progress} showProgressOnly={progressOnly} />
					</div>
				);
			}
		}

		return (
			<div key={topic.id}>
				<TopicTable rows={topic} showProgressOnly={progressOnly} />
			</div>
		);
	};

	const classes = useStyles();

	const onChangeView = () => {
		setProgressOnly(!progressOnly);
	};

	if (loading) {
		return (
			<div>
				<CircularProgress />
			</div>
		);
	} else {
		return (
			<div className={classes.root}>
				<Typography variant="h2" align="center">
					{topics[0].subjects.level} {topics[0].subjects.name} ({topics[0].subjects.examboard})
				</Typography>
				<ContentCard>
					<FormControlLabel
						control={<Checkbox onChange={onChangeView} value={progressOnly} name="progress-button" />}
						label="Show Progress Only"
					/>
				</ContentCard>
				{topics.map((topic) => topicTables(topic))}
			</div>
		);
	}
};

export default Subject;

import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ViewWrapper from '../general/ViewWrapper';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ContentCard from '../general/ContentCard';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';

const SubjectList = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [subjects, setSubjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getSubjects();
	}, []);

	const getSubjects = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/subjects/getall`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		console.log(responseData);
		setSubjects(responseData);
		setLoading(false);
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
				<ContentCard small>
					<Typography variant="h2" align="center">
						Subject List
					</Typography>
					<List>
						{subjects.map((subject) => (
							<ListItem
								button
								key={subject.id}
								onClick={() => (document.location.href = '/subject?subjectid=' + subject.id)}
							>
								<ListItemText
									primary={subject.name}
									secondary={subject.level + ' (' + subject.examboard + ')'}
								/>
							</ListItem>
						))}
					</List>
				</ContentCard>
			</ViewWrapper>
		);
	}
};
export default SubjectList;

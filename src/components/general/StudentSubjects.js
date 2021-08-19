import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import AddSubject from './AddSubject';
import ContentCard from './ContentCard';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

const StudentSubjects = () => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [subjects, setSubjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getStudentSubjects();
	}, []);

	const getStudentSubjects = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/subjects/getusersubjects`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		setSubjects(responseData);
		setLoading(false);
	};

	const handleClick = (subjectid) => {
		document.location.href = '/subject?subjectid=' + subjectid;
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
				<Typography variant="h2" color="initial" align="center">
					Subjects
				</Typography>
				<List>
					{subjects.map((subject) => (
						<div key={subject.subjects.id}>
							<ListItem
								button
								onClick={() => handleClick(subject.subjects.id)}
							>
								<ListItemText
									primary={
										subject.subjects.level +
										' - ' +
										subject.subjects.name +
										' (' +
										subject.subjects.examboard +
										')'
									}
								/>
							</ListItem>
							<Divider />
						</div>
					))}
				</List>
				<AddSubject subjects={subjects} setSubjects={setSubjects} />
			</ContentCard>
		);
	}
};
export default StudentSubjects;

import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ContentCard from './ContentCard';

const LatestProgress = (props) => {

	const getDateString = (dateString) => {
		const date = new Date(dateString);
		let dd = date.getDate();
		let mm = date.getMonth() + 1;
		const yyyy = date.getFullYear();
		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;
		return dd + '/' + mm + '/' + yyyy;
	};

	const handleClick = (pointid) => {
		document.location.href = '/point?pointid=' + pointid;
	};

	return (
		<ContentCard>
			<Typography variant="h2" align="center">
				Latest Learnt
			</Typography>
			<List>
				{props.points.map((point) => (
					<div key={point.id}>
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
							<ListItemText align="right" primary={getDateString(point.datetime)} />
						</ListItem>
						<Divider />
					</div>
				))}
			</List>
		</ContentCard>
	);
};
export default LatestProgress;

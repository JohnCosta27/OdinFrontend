import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import ContentCard from './ContentCard';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import DialogStyled from './DialogStyled';
import SubjectTopicPointForm from '../subjects/SubjectTopicPointForm';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import Button from '@material-ui/core/Button';
import 'react-calendar-heatmap/dist/styles.css';
import '../styles.css';

const StudentRevision = (props) => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();

	const [openRevision, setOpenRevision] = useState(false);
	const [openDates, setOpenDates] = useState(false);

	//* State to be used for submit and passed down to child
	const [subject, setSubject] = useState('');
	const [topic, setTopic] = useState('');
	const [newTopic, setNewTopic] = useState();
	const [points, setPoints] = useState([]);
	const [selectedPoints, setSelectedPoints] = useState([]);

	const useStyles = makeStyles((theme) => ({
		buttonWrapper: {
			display: 'flex',
			justifyContent: 'center',
		},
		button: {
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
		},
	}));

	useEffect(() => {
		if (topic != '') {
			getPoints();
		}
	}, [topic]);

	const getPoints = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/subjects/getpoints?topicid=` + topic, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		setPoints(responseData);
	};

	const handlePointSelect = (event) => {
		setSelectedPoints(event.target.value);
	};

	const submitProgress = async (event) => {
		event.preventDefault();
		const token = await getAccessTokenSilently();
		const body = {
			points: selectedPoints,
		};

		const data = await fetch(`${serverUrl}/progress/add`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const responseData = await data.json();
		if (responseData.error != undefined) {
		} else {
			setOpenRevision(false);
			props.setNewRevised(true);
		}
	};

	const getPointsSelect = () => {
		if (points.length != 0) {
			return (
				<FormControl required style={{ width: '100%' }}>
					<InputLabel id="topic-select">Points</InputLabel>
					<Select labelId="topic-select" value={selectedPoints} onChange={handlePointSelect} multiple>
						{points.map((points) => (
							<MenuItem key={points.id} value={points.id}>
								{points.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			);
		}
	};

	const getDateValues = () => {
		let dates = [];
		for (let d of props.points) {
			let found = false;
			for (let existingDates of dates) {
				if (
					existingDates.date.getMonth() == new Date(d.datetime).getMonth() &&
					existingDates.date.getDay() == new Date(d.datetime).getDay()
				) {
					existingDates.count++;
					found = true;
					break;
				}
			}

			if (!found) {
				dates.push({ date: new Date(d.datetime), count: 1 });
			}
		}
		return dates;
	};

	const getDateString = (dateString) => {
		const date = new Date(dateString);
		let dd = date.getDate();
		let mm = date.getMonth() + 1;
		const yyyy = date.getFullYear();
		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;
		return dd + '/' + mm + '/' + yyyy;
	};

	const classes = useStyles();

	let startDate = new Date();
	startDate.setMonth(startDate.getMonth() - 3);

	return (
		<ContentCard>
			<Typography variant="h2" align="center">
				Revision
			</Typography>
			<div className="ticket-history-wrapper">
				<div className="ticket-history-month">
					<CalendarHeatmap
						startDate={startDate}
						endDate={new Date()}
						values={getDateValues()}
						gutterSize={1}
						showWeekdayLabels
						classForValue={(value) => {
							if (!value) {
								return 'color-empty';
							} else if (value <= 4) {
								return `color-github-${value.count}`;
							} else {
								return `color-github-4`;
							}
						}}
						tooltipDataAttrs={(value) => {
							if (value.date != null) {
								return {
									'data-tip': `At ${getDateString(value.date)} you revised ${value.count} points`,
								};
							}
						}}
					/>
					<ReactTooltip />
				</div>
			</div>
			<div className={classes.buttonWrapper}>
				<div className={classes.button}>
					<DialogStyled
						buttonTitle="Revise"
						title="Revise Points"
						open={openRevision}
						setOpen={setOpenRevision}
						onSubmit={submitProgress}
						submitTitle="Revise Points"
					>
						<SubjectTopicPointForm
							state={{
								subject: subject,
								setSubject: setSubject,
								topic: topic,
								setTopic: setTopic,
								newTopic: newTopic,
								setNewTopic: setNewTopic,
							}}
							studentSubjects={true}
						/>
						{getPointsSelect()}
					</DialogStyled>
				</div>
				<div className={classes.button}>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => (document.location.href = '/revision-points')}
					>
						Revision Points
					</Button>
				</div>
			</div>
		</ContentCard>
	);
};
export default StudentRevision;

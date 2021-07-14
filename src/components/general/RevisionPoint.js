import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import ContentCard from './ContentCard';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import DialogStyled from './DialogStyled';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DateMomentUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const RevisionPoint = (props) => {
	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();
	const urlParams = new URLSearchParams(window.location.search);

	const [open, setOpen] = useState(false);
	const [reviseOpen, setReviseOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [timesRevised, setTimesRevised] = useState(props.timesRevised);
	const [lastRevised, setLastRevised] = useState(props.lastRevised);
	const [dates, setDates] = useState(props.dates)

	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '100%'
		},
		revisionStatsWrapper: {
			display: 'flex',
			flexDirection: 'column',
			width: '80%',
			marginLeft: '10%',
			[theme.breakpoints.down('sm')]: {
				width: '100%',
				marginLeft: 0,
			},
		},
		revisionStat: {
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
		},
		buttonWrapper: {
			display: 'flex',
			justifyContent: 'center',
		},
		button: {
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
		},
	}));

	const getDateString = (dateString) => {
		const date = new Date(dateString);
		let dd = date.getDate();
		let mm = date.getMonth() + 1;
		const yyyy = date.getFullYear();
		if (dd < 10) dd = '0' + dd;
		if (mm < 10) mm = '0' + mm;
		return dd + '/' + mm + '/' + yyyy;
	};

	const submitRevision = async (event) => {
		event.preventDefault();
		const token = await getAccessTokenSilently();
		const body = {
			points_id: urlParams.get('pointid'),
			datetime: selectedDate,
		};
		const data = await fetch(`${serverUrl}/progress/addsingular`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const responseData = await data.json();
		setTimesRevised(timesRevised + 1);
		if (new Date(selectedDate) > new Date(lastRevised) || lastRevised == undefined) {
			setLastRevised(new Date(selectedDate));
		}

		setReviseOpen(false);
	};

	const classes = useStyles();

	const getLastRevised = () => {
		if (lastRevised != undefined) {
			return (
				<div className={classes.revisionStat}>
					<Typography variant="h5" align="center">
						Last Revised
					</Typography>
					<Typography variant="h6">
						{getDateString(lastRevised)}
					</Typography>
				</div>
			);
		}
	};

	const getRevisionDates = () => {
		if (dates != undefined) {
			return (
				<div className={classes.button}>
					<DialogStyled
						buttonTitle="View Dates"
						open={open}
						setOpen={setOpen}
						title="Point Revision Dates"
					>
						<List>
							{props.dates.map((date) => (
								<ListItem button key={date}>
									<ListItemText
										primary={getDateString(date)}
										align="center"
									/>
								</ListItem>
							))}
						</List>
					</DialogStyled>
				</div>
			);
		}
	};

	return (
		<ContentCard className={classes.root}>
			<Typography variant="h2" align="center">
				Revision
			</Typography>
			<Divider />
			<div className={classes.revisionStatsWrapper}>
				<div className={classes.revisionStat}>
					<Typography variant="h5" align="center">
						Times Revised
					</Typography>
					<Typography variant="h6">{timesRevised}</Typography>
				</div>
				{getLastRevised()}
			</div>
			<div className={classes.buttonWrapper}>
				<div className={classes.button}>
					<DialogStyled
						buttonTitle="Revise"
						open={reviseOpen}
						setOpen={setReviseOpen}
						title="Revise Point"
						submitTitle="Revise Point"
						onSubmit={submitRevision}
					>
						<MuiPickersUtilsProvider utils={DateMomentUtils}>
							<DatePicker
								onChange={setSelectedDate}
								inputVariant="outlined"
								value={selectedDate}
								color="secondary"
								style={{ width: '100%' }}
							/>
						</MuiPickersUtilsProvider>
					</DialogStyled>
				</div>
				{getRevisionDates()}
			</div>
		</ContentCard>
	);
};
export default RevisionPoint;

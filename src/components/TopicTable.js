import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';

const TopicTable = (props) => {

	const [selected, setSelected] = useState(new Array(props.rows.points.length).fill(false));
	const [subjectSelected, setSubjectSelected] = useState(false);

	const useStyles = makeStyles((theme) => ({
		tableWrapper: {
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),
			paddingTop: theme.spacing(5),
			paddingBottom: theme.spacing(5),
		},
		table: {
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
			width: '100%',
		},
		highlightedPoint: {
			backgroundColor: theme.palette.highlight.main,
		},
	}));

	const getPointRow = (point) => {
		if (props.admin) {
			if (props.edit) {
				return (
					<div key={point.id}>
						<ListItem button>
							<ListItemIcon>
								<Checkbox/>
							</ListItemIcon>
							<ListItemText primary={point.name} />
						</ListItem>
					</div>
				);
			} else {
				return (
					<div key={point.id}>
						<ListItem button onClick={() => buttonClick(point.id)}>
							<ListItemText primary={point.name} />
						</ListItem>
					</div>
				);
			}
		} else {
			if (props.progress == undefined) {
				if (!props.showProgressOnly) {
					return (
						<div key={point.id}>
							<ListItem button onClick={() => buttonClick(point.id)}>
								<ListItemText primary={point.name} />
							</ListItem>
						</div>
					);
				}
			} else {
				for (let p of props.progress.points) {
					if (p.pointid == point.id) {
						return (
							<div className={classes.highlightedPoint} key={point.id}>
								<ListItem button onClick={() => buttonClick(point.id)}>
									<ListItemText primary={point.name} />
								</ListItem>
							</div>
						);
					}
				}
				return (
					<div key={point.id}>
						<ListItem button onClick={() => buttonClick(point.id)}>
							<ListItemText primary={point.name} />
						</ListItem>
					</div>
				);
			}
		}
	};

	const getTopic = () => {
		if (props.edit) {
			return (
				<ListItem>
					<ListItemIcon>
						<Checkbox />
					</ListItemIcon>
					<Typography variant="h5" color="initial">
						{props.rows.name}
					</Typography>
				</ListItem>
			);
		} else {
			return (
				<ListItem>
					<Typography variant="h5" color="initial">
						{props.rows.name}
					</Typography>
				</ListItem>
			);
		}
	};

	const buttonClick = (id) => {
		document.location.href = '/point?pointid=' + id;
	};

	const classes = useStyles();
	let counter = 0;

	return (
		<div className={classes.tableWrapper}>
			<Paper className={classes.table} elevation={4}>
				<List>
					{getTopic()}
					{props.rows.points.map((point) => getPointRow(point))}
				</List>
			</Paper>
		</div>
	);
};
export default TopicTable;

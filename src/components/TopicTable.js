import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const TopicTable = (props) => {

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
			maxWidth: 1200,
			width: '100%',
		},
		highlightedPoint: {
			backgroundColor: theme.palette.highlight.main,
		},
	}));

	const getPointRow = (point) => {
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
		}
	};

	const buttonClick = (id) => {
		document.location.href = '/point?pointid=' + id;
	};

	const classes = useStyles();

	return (
		<div className={classes.tableWrapper}>
			<Paper className={classes.table} elevation={4}>
				<List>
					<ListItem>
						<Typography variant="h5" color="initial">
							{props.rows.name}
						</Typography>
					</ListItem>
					{props.rows.points.map((point) => getPointRow(point))}
				</List>
			</Paper>
		</div>
	);
};
export default TopicTable;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
			backgroundColor: theme.palette.highlight.main
		}
	}));

	const getPointRow = (point) => {
		if (props.progress == undefined) {
			return (
				<TableRow key={point.id}>
					<TableCell component="th" scope="row">
						{point.id}
					</TableCell>
					<TableCell align="right">{point.name}</TableCell>
				</TableRow>
			);
		} else {
			for (let p of props.progress.points) {
				if (p.pointid == point.id) {
					return (
						<TableRow
							key={point.id}
							className={classes.highlightedPoint}
						>
							<TableCell component="th" scope="row">
								{point.id}
							</TableCell>
							<TableCell align="right">{point.name}</TableCell>
						</TableRow>
					);
				}
			}
		}
	};

	const classes = useStyles();

	return (
		<div className={classes.tableWrapper}>
			<TableContainer
				className={classes.table}
				component={Paper}
				elevation="4"
			>
				<Table aria-label="Subject Table">
					<TableHead>
						<TableRow>
							<TableCell>{props.rows.id}</TableCell>
							<TableCell align="right">
								{props.rows.name}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.rows.points.map((point) => getPointRow(point))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
export default TopicTable;

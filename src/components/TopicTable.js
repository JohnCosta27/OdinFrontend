import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const TopicTable = (props) => {
	const useStyles = makeStyles((theme) => ({
		tableWrapper: {
			display: 'flex',
			justifyContent: 'center',
			width: '100%',
		},
		table: {
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
			maxWidth: 1000,
		},
	}));

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
						{props.rows.points.map((point) => (
							<TableRow key={point.id}>
								<TableCell component="th" scope="row">
									{point.id}
								</TableCell>
								<TableCell align="right">
									{point.name}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
export default TopicTable;

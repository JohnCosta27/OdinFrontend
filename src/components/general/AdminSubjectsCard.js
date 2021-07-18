import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ContentCard from './ContentCard';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import CreateSubject from '../subjects/CreateSubject';
import CreateSubjectPoints from '../subjects/CreateSubjectPoints';
import Checkbox from '@material-ui/core/Checkbox';

const AdminSubjectsCard = () => {
	const useStyles = makeStyles((theme) => ({
		centeredButtons: {
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
			flexDirection: 'row',
			position: 'relative',
			'&>*': {
				marginLeft: theme.spacing(1),
				marginRight: theme.spacing(1),
			},
			[theme.breakpoints.down('xs')]: {
				flexDirection: 'column',
				'&>*': {
					marginTop: theme.spacing(1),
					marginBottom: theme.spacing(1),
				},
			},
		},
		buttonWrapper: {
			display: 'flex',
			justifyContent: 'center',
		},
	}));

	const classes = useStyles();

	return (
		<ContentCard>
			<div>
				<Typography variant="h2" color="initial" align="center">
					Subjects
				</Typography>
			</div>
			<div className={classes.centeredButtons}>
				<div className={classes.buttonWrapper}>
					<Button
						color="secondary"
						variant="contained"
						onClick={() => (document.location.href = '/subject-list')}
					>
						View All
					</Button>
				</div>
				<CreateSubject />
				<CreateSubjectPoints />
			</div>
		</ContentCard>
	);
};
export default AdminSubjectsCard;

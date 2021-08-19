import React from 'react';
import clsx from 'clsx';
import ViewWrapper from '../general/ViewWrapper';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import bannerImage from '../../images/background.jpg';
import Logo from '../../images/TransparentLogo.png';
import waves from '../../images/waves.svg';
import waves2 from '../../images/waves2.svg';
import { differenceInCalendarISOWeeks } from 'date-fns';

const FrontPage = () => {
	const useStyles = makeStyles((theme) => ({
		root: {
			width: '100%',
		},
		banner: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundImage: `url(${bannerImage})`,
			backgroundSize: 'cover',
			width: '100%',
			height: '80vh',
		},
		whiteText: {
			color: '#FAFAFA',
		},
		section: {
			width: '100%',
			display: 'flex',
			justifyContent: 'center',
			paddingTop: theme.spacing(5),
			paddingBottom: theme.spacing(5),
		},
		sectionContent: {
			width: '100%',
			height: '100%',
			maxWidth: 1200,
			display: 'flex',
			flexDirection: 'column',
			alignContent: 'center',
			paddingLeft: theme.spacing(10),
			paddingRight: theme.spacing(10),
		},
		space: {
			width: '100%',
			height: 100,
		},
		rowFlex: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			height: '30vh',
		},
		logo: {
			backgroundImage: `url(${Logo})`,
			backgroundSize: 'contain',
			backgroundPositionX: 'center',
			backgroundPositionY: 'center',
			backgroundRepeat: 'no-repeat',
			width: '100%',
			height: '100%',
		},
		secondSection: {
			width: '100%',
			height: '100vh',
			display: 'flex',
			justifyContent: 'center',
			paddingTop: theme.spacing(5),
			paddingBottom: theme.spacing(5),
			backgroundColor: theme.palette.darkbackground.main,
		},
		spacer: {
			aspectRatio: '1920/200',
			width: '100%',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
		},
		layer1: {
			backgroundImage: `url(${waves})`,
		},
		layer2: {
			backgroundImage: `url(${waves2})`,
		},
	}));
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div
				className="flex flex-col justify-center w-full h-1/2 items-center bg-gradient-to-r
					from-green-300
					to-blue-700
					via-purple-500
					"
			>
				<div className="m-auto flex flex-col">
					<h1 className="flex-auto text-9xl text-center font-sans text-transparent bg-clip-text bg-gradient-to-br from-gray-700 to-gray-900">
						Odin
					</h1>
					<h1 className="flex-auto text-8xl text-center font-sans text-transparent bg-clip-text bg-gradient-to-br from-gray-700 to-gray-900">
						Revision, Revised!
					</h1>
				</div>
			</div>
			<div className={classes.section}>
				<div className={classes.sectionContent}>
					<Typography variant="h2" color="initial" align="center">
						We make it easier than ever to keep track of revision
					</Typography>
					<div className={classes.space} />
					<div className="px-24">
						<Typography variant="body1">
							With Odin, you will never get lost with your
							revision again. You will always know what you need
							to revise, when to revise it, and how to revise it.
						</Typography>
					</div>
					<div className={classes.space} />
					<div className={classes.rowFlex}>
						<Typography variant="h4">
							Powered by Real Tutor. A company made to help
							students using the power of the internet.
						</Typography>
						<div className={classes.logo} />
					</div>
				</div>
			</div>

			<div className={clsx(classes.spacer, classes.layer1)} />
			<div className={clsx(classes.spacer, classes.layer2)} />

			<div className={classes.secondSection}>
				<div className={classes.sectionContent}>
					<Typography variant="h2" className={classes.whiteText}>
						How does it work?
					</Typography>
				</div>
			</div>
		</div>
	);
};
export default FrontPage;

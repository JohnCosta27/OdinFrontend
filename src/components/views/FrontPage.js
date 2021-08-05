import React from 'react';
import ViewWrapper from '../general/ViewWrapper';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import bannerImage from '../../images/background.jpg';
import Logo from '../../images/TransparentLogo.png';

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
			height: '30vh'
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
			backgroundColor: theme.palette.primary.main
		},
	}));
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.banner}>
				<Typography
					variant="h1"
					color="initial"
					align="center"
					className={classes.whiteText}
				>
					Odin
				</Typography>
				<Typography
					variant="h2"
					color="initial"
					align="center"
					className={classes.whiteText}
				>
					Revision, revised!
				</Typography>
			</div>
			<div className={classes.section}>
				<div className={classes.sectionContent}>
					<Typography variant="h2" color="initial" align="center">
						We make it easier than ever to keep track of revision
					</Typography>
					<div className={classes.space} />
					<Typography variant="body1">
						lorem idmsadsalorem idmsadsalorem idmsadsalorem
						idmsadsalorem idmsadsalorem idmsadsalorem idmsadsalorem
						idmsadsalorem idmsadsalorem idmsadsalorem idmsadsalorem
						idmsadsalorem idmsadsalorem idmsadsa
					</Typography>
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

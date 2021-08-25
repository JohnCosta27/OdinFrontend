import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import ContentCard from '../general/ContentCard';
import Divider from '@material-ui/core/Divider';
import ViewWrapper from '../general/ViewWrapper';
import FileUpload from '../general/FileUpload';
import ContentNotes from '../general/ContentNotes';
import RevisionPoint from '../general/RevisionPoint';
import GridItem from '../general/GridItem';
import Grid from '@material-ui/core/Grid';
import DisplayStudentNotes from '../general/DisplayStudentNotes';
import YouTube from 'react-youtube';
import jwtDecode from 'jwt-decode';
import DialogStyled from '../general/DialogStyled';
import TextField from '@material-ui/core/TextField';

const Point = () => {
	const [admin, setAdmin] = useState(false);
	const [loading1, setLoading1] = useState(true);
	const [loading2, setLoading2] = useState(true);
	const [loading3, setLoading3] = useState(true);
	const [point, setPoint] = useState([]);
	const [pointRevision, setPointRevision] = useState([]);
	const [open, setOpen] = useState(false);
	const [studentNotes, setStudentNotes] = useState([]);
	const [video, setVideo] = useState('');

	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();
	const urlParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		getPoint();
		getPointRevision();
		getUserNotes();
		checkAdmin();
	}, []);

	const checkAdmin = async () => {
		const token = await getAccessTokenSilently();
		const jwt = jwtDecode(token);
		if (jwt.permissions.includes('role:admin')) {
			setAdmin(true);
		}
	};

	const getPoint = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(
			`${serverUrl}/subjects/getpoint?pointid=` +
				urlParams.get('pointid'),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const responseData = await data.json();
		setPoint(responseData);
		setLoading1(false);
	};

	const getPointRevision = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(
			`${serverUrl}/subjects/getpointrevision?pointid=` +
				urlParams.get('pointid'),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const responseData = await data.json();
		await responseData.sort((a, b) => {
			return new Date(b.datetime) - new Date(a.datetime);
		});
		if (responseData.error != undefined) {
			document.location.href = '/';
		}
		setPointRevision(responseData);
		setLoading2(false);
	};

	const getUserNotes = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(
			`${serverUrl}/usercontent/getusernotepoint?pointid=` +
				urlParams.get('pointid'),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const responseData = await data.json();
		setStudentNotes(responseData);
		setLoading3(false);
	};

	const getDates = (point) => {
		let dates = [];
		for (let p of point) {
			dates.push(p.datetime);
		}
		return dates;
	};

	const getRevisionPoint = () => {
		if (pointRevision.length == 0) {
			return (
				<GridItem md={6} xs={12}>
					<RevisionPoint timesRevised={0} />
				</GridItem>
			);
		} else {
			return (
				<GridItem md={6} xs={12}>
					<RevisionPoint
						timesRevised={pointRevision.length}
						lastRevised={pointRevision[0].datetime}
						dates={getDates(pointRevision)}
					/>
				</GridItem>
			);
		}
	};

	const youtubeSubmit = async (event) => {
		event.preventDefault();

		const body = {
			videoid: video,
			pointid: urlParams.get('pointid'),
		};

		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/pointcontent/setyoutubevideo`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const responseData = await data.json();

		let newPoint = point;
		newPoint.youtubeVideo = video;
		setPoint(newPoint);
		setOpen(false);
	};

	const handleChange = (event) => {
		setVideo(event.target.value);
	};

	const getAdminPoint = () => {
		if (admin) {
			return (
				<ContentCard>
					<Typography variant="h2" align="center">
						Admin Options
					</Typography>
					<Grid container>
						<Grid item md={6} xs={12}>
							<DialogStyled
								buttonTitle="Add Youtube Video"
								open={open}
								setOpen={setOpen}
								title="Add YouTube Video"
								submitTitle="Add"
								onSubmit={youtubeSubmit}
							>
								<TextField
									label="YouTube Video ID"
									style={{ width: '100%' }}
									value={video}
									onChange={handleChange}
								></TextField>
							</DialogStyled>
						</Grid>
						<Grid item md={6} xs={12}>
							<FileUpload />
						</Grid>
					</Grid>
				</ContentCard>
			);
		}
	};

	const getYouTubeVideo = () => {
		if (point.youtubeVideo != null) {
			return (
				<GridItem lg={12} md={12} xs={12}>
					<ContentCard>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								width: '100%',
							}}
						>
							<div
								style={{
									width: '100%',
									maxWidth: 600,
								}}
							>
								<YouTube
									videoId={point.youtubeVideo}
									opts={{ width: '100%' }}
								/>
							</div>
						</div>
					</ContentCard>
				</GridItem>
			);
		}
	};

	if (loading1 || loading2 || loading3) {
		return <CircularProgress />;
	} else {
		return (
			<ViewWrapper>
				{getAdminPoint()}
				<Grid container spacing={3}>
					<GridItem md={6} xs={12}>
						<ContentCard>
							<Typography variant="h2" align="center">
								{point[0].topics.name}
							</Typography>
							<Divider />
							<Typography variant="h4" align="center">
								{point[0].name}
							</Typography>
						</ContentCard>
					</GridItem>
					{getRevisionPoint()}
					{getYouTubeVideo()}
					<GridItem lg={12} md={12} xs={12}>
						<ContentNotes />
					</GridItem>
					<GridItem lg={12} md={12} xs={12}>
						<DisplayStudentNotes notes={studentNotes} />
					</GridItem>
				</Grid>
			</ViewWrapper>
		);
	}
};
export default Point;

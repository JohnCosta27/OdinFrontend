import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import ContentCard from '../general/ContentCard';
import Divider from '@material-ui/core/Divider';
import file from '../../SmallBanner.jpeg';
import FileUpload from '../general/FileUpload';

const Point = () => {
	const [point, setPoint] = useState();
	const [loading, setLoading] = useState(true);

	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();
	const urlParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		getPoint();
	}, []);

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
		if (responseData.error != undefined) {
			document.location.href = '/';
		}

       /* let body = new FormData();
        body.append('note', file);
		data = await fetch(`${serverUrl}/files/image`, {
            method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
			},
            body: body
		});
        responseData = await data.json();
        console.log(responseData);*/

		setPoint(responseData[0]);
		setLoading(false);
	};

	if (loading) {
		return <CircularProgress />;
	} else {
		return (
			<div>
                <FileUpload />
				<ContentCard>
					<Typography variant="h2" align="center">
						{point.topics.name}
					</Typography>
					<Divider />
					<Typography variant="h4" align="center">
						{point.name}
					</Typography>
				</ContentCard>
			</div>
		);
	}
};
export default Point;

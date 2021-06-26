import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Subject = () => {

    const [subject, setSubject] = useState();
    const [loading, setLoading] = useState(false);

	const serverUrl = process.env.REACT_APP_SERVER_URL;
	const { getAccessTokenSilently } = useAuth0();
	const urlParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		getSubject();
	}, []);

	const getSubject = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(
			`${serverUrl}/subjects/get?subjectid=` + urlParams.get('subjectid'),
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const responseData = await data.json();
		setSubject(responseData[0]);
		setLoading(false);
	};

    if (loading) {
        return (
            <CircularProgress />
        )
    } else {

    }

};

export default Subject;

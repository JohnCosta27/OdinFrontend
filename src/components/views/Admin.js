import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useAuth0 } from '@auth0/auth0-react';
import ViewWrapper from '../general/ViewWrapper';
import CreateSubject from '../subjects/CreateSubject';
import CreateSubjectPoints from '../subjects/CreateSubjectPoints';
import FileUpload from '../general/FileUpload';
import StudentList from '../general/StudentList';
import Grid from '@material-ui/core/Grid';
import GridItem from '../general/GridItem';

const Admin = () => {
	const { getAccessTokenSilently } = useAuth0();
	const serverUrl = process.env.REACT_APP_SERVER_URL;

	const [allowed, setAllowed] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		checkPermissions();
	}, []);

	const checkPermissions = () => {
		getAccessTokenSilently().then((token) => {
			const jwt = jwtDecode(token);
			if (jwt.permissions.includes('role:admin')) {
				setAllowed(true);
				setLoading(false);
			} else {
				window.location.href = '/dashboard';
			}
		});
	};

	if (!allowed || loading) {
		return null;
	} else {
		return (
			<ViewWrapper>
				<Grid container spacing={3}>
					<GridItem md={4} xs={12}>
						<CreateSubject />
					</GridItem>
					<GridItem md={4} xs={12}>
						<CreateSubjectPoints />
					</GridItem>
					<GridItem md={4} xs={12}>
						<FileUpload />
					</GridItem>
					<GridItem xs={12}>
						<StudentList />
					</GridItem>
				</Grid>
			</ViewWrapper>
		);
	}
};
export default Admin;

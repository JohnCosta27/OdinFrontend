import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useAuth0 } from '@auth0/auth0-react';
import ViewWrapper from '../general/ViewWrapper';
import CreateSubject from '../subjects/CreateSubject';
import CreateSubjectPoints from '../subjects/CreateSubjectPoints'
import FileUpload from '../general/FileUpload';

const Admin = () => {
	const { getAccessTokenSilently } = useAuth0();
	const serverUrl = process.env.REACT_APP_SERVER_URL;

	const [allowed, setAllowed] = useState(false);

	useEffect(() => {
		checkPermissions();
	}, []);

	const checkPermissions = () => {
		getAccessTokenSilently().then((token) => {
			const jwt = jwtDecode(token);
			if (jwt.permissions.includes('role:admin')) {
                setAllowed(true);
				getAllUsers();
			} else {
                window.location.href = '/dashboard';
            }
		});
	};

	const getAllUsers = async () => {
		const token = await getAccessTokenSilently();
		const data = await fetch(`${serverUrl}/users/getall`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const responseData = await data.json();
		console.log(responseData);
	}

	if (!allowed) {
		return null;
	} else {
		return (
			<ViewWrapper>
				<CreateSubject />
				<CreateSubjectPoints />
				<FileUpload />
			</ViewWrapper>
		);
	}
};
export default Admin;

import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useAuth0 } from '@auth0/auth0-react';

const Admin = () => {
	const { getAccessTokenSilently } = useAuth0();

	const [allowed, setAllowed] = useState(false);

	useEffect(() => {
		checkPermissions();
	}, []);

	const checkPermissions = () => {
		getAccessTokenSilently().then((token) => {
			const jwt = jwtDecode(token);
			if (jwt.permissions.includes('role:admin')) {
                setAllowed(true);
			} else {
                window.location.href = '/dashboard';
            }
		});
	};

	if (!allowed) {
		return null;
	} else {
		return <div>Hello Admin</div>;
	}
};
export default Admin;

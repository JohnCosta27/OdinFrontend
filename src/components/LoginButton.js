import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	const login = async () => {
		loginWithRedirect({
			appState: {
				returnTo: '/dashboard',
			},
		});
	};
	return (
		<Button variant="outlined" color="secondary" onClick={login}>
			Log In
		</Button>
	);
};

export default LoginButton;

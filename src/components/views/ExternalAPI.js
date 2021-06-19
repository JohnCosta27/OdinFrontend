import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';

const ExternalApi = () => {
	const [message, setMessage] = useState('');
	const serverUrl = process.env.REACT_APP_SERVER_URL;

	const { getAccessTokenSilently } = useAuth0();

	const callApi = async () => {
		try {
			const response = await fetch(
				`${serverUrl}/api/public`
			);

			const responseData = await response.json();

			setMessage(responseData.message);
		} catch (error) {
			setMessage(error.message);
		}
	};

	const callSecureApi = async () => {
		try {
			const token = await getAccessTokenSilently();

			const response = await fetch(
				`${serverUrl}/api/protected`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const responseData = await response.json();

			setMessage(responseData.message);
		} catch (error) {
			setMessage(error.message);
		}
	};

	return (
        <div>
            <Button onClick={callApi} variant="contained" color="secondary">Call Public</Button>
            <Button onClick={callSecureApi} color="secondary">Call Private</Button>
            <div>
                {message}
            </div>
        </div>
	);
};

export default ExternalApi;

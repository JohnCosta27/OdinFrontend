import React from 'react';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const Profile = () => {
	const { user } = useAuth0();
	const { name, picture, email } = user;

	return (
		<div>
			<img
				src={picture}
				alt="Profile"
				className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
			/>
            <br></br>
			{JSON.stringify(user, null, 2)}
		</div>
	);
};

export default Profile;

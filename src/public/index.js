import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from '../auth/auth0-provider-with-history';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from '../components/Theme';
import "./index.css";

ReactDOM.render(
	<ThemeProvider theme={Theme}>
		<Router>
			<Auth0ProviderWithHistory>
				<App />
			</Auth0ProviderWithHistory>
		</Router>
	</ThemeProvider>,
	document.getElementById('app')
);

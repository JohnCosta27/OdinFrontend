import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App/App';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from '../auth/auth0-provider-with-history';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from '../components/Theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';

const onRedirectCallback = (appState) => {
	history.push(
		appState && appState.returnTo
			? appState.returnTo
			: window.location.pathname
	);
};

ReactDOM.render(
	<ThemeProvider theme={Theme}>
		<CssBaseline />
		<Router>
			<Auth0ProviderWithHistory
				redirectUri={window.location.origin}
				onRedirectCallback={onRedirectCallback}
			>
				<App />
			</Auth0ProviderWithHistory>
		</Router>
	</ThemeProvider>,
	document.getElementById('app')
);

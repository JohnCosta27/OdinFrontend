import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { grey, teal } from '@material-ui/core/colors'
// A custom theme for this app
let Theme = createMuiTheme({
	palette: {
		primary: {
            main: grey[900]
        },
		secondary: {
			main: teal[500]
		}
	},
	typography: {
		fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
});

Theme = responsiveFontSizes(Theme);
export default Theme;
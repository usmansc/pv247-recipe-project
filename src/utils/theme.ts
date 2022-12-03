import { createTheme } from '@mui/material';

// based on https://coolors.co/79addc-ffc09f-ffee93-fcf5c7-adf7b6
const Palette = {
	Iceberg: '#79ADDC',
	PeachCrayola: '#FFC09F',
	YellowCrayola: '#FFEE93',
	LemonChiffon: '#FCF5C7',
	GrannySmithApple: '#ADF7B6'
};

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: { main: Palette.PeachCrayola },
		secondary: { main: Palette.Iceberg },
		background: {
			default: '#fafafa'
		}
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				// Css rule that makes sure app is always 100% height of window
				'body, #root': {
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh'
				}
			}
		}
	}
});

export default theme;

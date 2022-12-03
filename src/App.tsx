import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { UserProvider } from './hooks/useLoggedInUser';
import AppRoutes from './components/AppRoutes';
import Layout from './components/Layout';
import theme from './utils/theme';

const App = () => (
	<UserProvider>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<CssBaseline />
				<Layout>
					<AppRoutes />
				</Layout>
			</BrowserRouter>
		</ThemeProvider>
	</UserProvider>
);

export default App;

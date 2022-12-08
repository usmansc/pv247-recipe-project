import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from 'react-query';

import { UserProvider } from './hooks/useLoggedInUser';
import AppRoutes from './components/AppRoutes';
import Layout from './components/Layout';
import theme from './utils/theme';
import { queryClient } from './utils/query';

const App = () => (
	<QueryClientProvider client={queryClient}>
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
	</QueryClientProvider>
);

export default App;

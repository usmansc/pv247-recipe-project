import { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const user = useLoggedInUser();
	return (
		<>
			<Box>
				<AppBar position="static">
					<Container maxWidth="md">
						<Toolbar>
							<Button component={Link} to="/" color="inherit">
								Recipes
							</Button>
							<Box sx={{ flexGrow: 1 }} />
							{!user ? (
								<Button component={Link} to="/login" color="inherit">
									Login
								</Button>
							) : (
								<>
									<Button component={Link} to="/add" color="inherit">
										Add Recipe
									</Button>
									<Button component={Link} to="/profile" color="inherit">
										Profile
									</Button>
									<Button onClick={signOut} color="inherit">
										Logout
									</Button>
								</>
							)}
						</Toolbar>
					</Container>
				</AppBar>
			</Box>
			<Container
				maxWidth="md"
				component="main"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexGrow: 1,
					gap: 2,
					backgroundColor: 'secondary',
					py: 5
				}}
			>
				{children}
			</Container>
		</>
	);
};
export default Layout;

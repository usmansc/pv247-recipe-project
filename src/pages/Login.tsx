import {
	Box,
	Button,
	Container,
	Paper,
	TextField,
	Typography
} from '@mui/material';

import useField from '../hooks/useField';
import {
	emailValidator,
	passwordValidator,
	requiredValidator
} from '../utils/validation';

const Login = () => {
	const [email, emailProps] = useField(
		'email',
		requiredValidator,
		emailValidator
	);
	const [password, passwordProps] = useField(
		'password',
		requiredValidator,
		passwordValidator
	);
	return (
		<Container
			maxWidth="sm"
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				flexGrow: 1
			}}
		>
			<Paper
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: 4,
					gap: 2
				}}
			>
				<Typography variant="h4" component="h2" mb={3}>
					Welcome!
				</Typography>
				<TextField type="email" label="Email" {...emailProps} />
				<TextField type="password" label="Password" {...passwordProps} />
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						alignItems: 'center',
						alignSelf: 'flex-end',
						mt: 2
					}}
				>
					<Button variant="outlined" color="secondary">
						Sign Up
					</Button>
					<Button variant="contained">Sign In</Button>
				</Box>
			</Paper>
		</Container>
	);
};

export default Login;

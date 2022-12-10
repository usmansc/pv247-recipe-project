import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useCallback } from 'react';

import { UserAvatar } from '../components/UserAvatar';
import { Category, CategorySelection } from '../components/CategorySelection';
import useField from '../hooks/useField';
import { emailValidator, requiredValidator } from '../utils/validation';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { updateUserData, updateUserEmail } from '../utils/firebase';

const Profile = () => {
	const user = useLoggedInUser();
	const [displayName, displayNameProps] = useField(
		'display-name',
		user?.displayName ?? ''
	);
	const [email, emailProps] = useField(
		'email',
		user?.email ?? '',
		requiredValidator,
		emailValidator
	);
	const onUserDataSaved = useCallback(() => {
		if (!user) {
			return;
		}
		Promise.all([
			updateUserData(user, { displayName }),
			updateUserEmail(user, email)
		]).catch(console.error);
	}, [user, displayName, email]);
	return (
		<Paper sx={{ p: 4 }}>
			<Typography variant="h4" component="h2" mb={3}>
				My Profile
			</Typography>
			<Grid container spacing={3} alignItems="center">
				<Grid item xs={12} md={1}>
					<UserAvatar name={displayName} />
				</Grid>
				<Grid item xs={12} md={11}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Display Name"
								sx={styles.field}
								{...displayNameProps}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField label="Email" {...emailProps} sx={styles.field} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant="contained" color="primary" onClick={onUserDataSaved}>
						Save
					</Button>
				</Grid>
			</Grid>
			<Typography variant="h5" component="h3" my={3} mb={1}>
				Favorite Categories
			</Typography>
			<CategorySelection
				categories={categories}
				initialSelection={['1', '2']}
				onChange={() => {
					console.log("I'm a callback");
				}}
			/>
			<Typography variant="h5" component="h3" my={3} mb={1}>
				My Recipes
			</Typography>
			TODO
		</Paper>
	);
};

const categories: Category[] = [
	{
		id: '1',
		name: 'Spaghetti'
	},
	{
		id: '2',
		name: 'Pizza'
	},
	{
		id: '3',
		name: 'Burger'
	},
	{
		id: '4',
		name: 'Salad'
	},
	{
		id: '5',
		name: 'Soup'
	},
	{
		id: '6',
		name: 'Dessert'
	},
	{
		id: '7',
		name: 'Breakfast'
	},
	{
		id: '8',
		name: 'Lunch'
	},
	{
		id: '9',
		name: 'Dinner'
	},
	{
		id: '10',
		name: 'Snack'
	},
	{
		id: '11',
		name: 'Drink'
	}
];

const styles = {
	field: {
		width: '100%'
	}
};

export default Profile;

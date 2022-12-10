import { Grid, Paper, TextField, Typography } from '@mui/material';

import { UserAvatar } from '../components/UserAvatar';
import { Category, CategorySelection } from '../components/CategorySelection';

const Profile = () => (
	<Paper sx={{ p: 4 }}>
		<Typography variant="h4" component="h2" mb={3}>
			My Profile
		</Typography>
		<Grid container spacing={3} alignItems="center">
			<Grid item xs={12} md={1}>
				<UserAvatar name="David Lang" />
			</Grid>
			<Grid item xs={12} md={11}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField label="First Name" value="David" sx={styles.field} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField label="Last Name" value="Lang" sx={styles.field} />
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Email"
							value="485197@muni.cz"
							disabled
							sx={styles.field}
						/>
					</Grid>
				</Grid>
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
	</Paper>
);

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

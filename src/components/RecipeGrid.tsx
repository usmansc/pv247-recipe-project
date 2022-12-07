import { Grid } from '@mui/material';

import RecipeCard, { RecipeType } from './RecipeCard';

const RecipeGrid = ({ recipes }: { recipes: RecipeType[] }) => (
	<Grid container spacing={2}>
		{recipes.map(recipe => (
			<Grid item xs={12} sm={6} md={4} lg={3} key={recipe.id}>
				<RecipeCard recipe={recipe} />
			</Grid>
		))}
	</Grid>
);

export default RecipeGrid;

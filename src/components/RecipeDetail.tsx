import { Grid, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { Recipe } from '../utils/firebase';

import RecipeDetailCard from './RecipeDetailCard';

// GEt recipe as prop
// Accept callback for delete recipe as prop
const RecipeDetail = ({
	recipe,
	deleteRecipe
}: {
	recipe: Recipe;
	deleteRecipe: (id: string) => void;
}) => {
	const handleDelete = () => {
		deleteRecipe(recipe.id);
	};

	return (
		<>
			<RecipeDetailCard recipe={recipe} />
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<Button onClick={handleDelete} variant="contained" color="secondary">
						Delete
					</Button>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={3}>
					<Button
						component={Link}
						to={`/edit/${recipe.id}`}
						state={{ recipeProp: recipe }}
						variant="contained"
						color="primary"
					>
						Edit
					</Button>
				</Grid>
			</Grid>
		</>
	);
};

export default RecipeDetail;

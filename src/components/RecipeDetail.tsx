import { Alert, Grid, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import { RecipeType } from './RecipeCard';
import RecipeDetailCard from './RecipeDetailCard';

const RecipeDetail = () => {
	const { id } = useParams<{ id: string }>();
	const [recipe, setRecipe] = useState<RecipeType | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		// TODO: Fetch the recipe from the API
	}, [id]);

	const handleDelete = () => {
		deleteRecipe(id);
	};

	return (
		<>
			{isLoading && <Typography>Loading...</Typography>}
			{error && <Alert severity="error">{error}</Alert>}
			{recipe && (
				<>
					<RecipeDetailCard recipe={recipe} />
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<Button
								onClick={handleDelete}
								variant="contained"
								color="secondary"
							>
								Delete
							</Button>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<Button
								component={Link}
								to={`/edit/${recipe.id}`}
								variant="contained"
								color="primary"
							>
								Edit
							</Button>
						</Grid>
					</Grid>
				</>
			)}
		</>
	);
};

const deleteRecipe = async (id: string | undefined) => {
	// TODO: implement delete recipe
};

export default RecipeDetail;

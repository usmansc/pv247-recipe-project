import { Grid, Button, Collapse, Alert, IconButton } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { Recipe } from '../utils/firebase';

import RecipeDetailCard from './RecipeDetailCard';

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
	const [open, setOpen] = useState(false);

	const user = useLoggedInUser();

	return (
		<>
			<RecipeDetailCard recipe={recipe} />
			<Collapse in={open}>
				<Alert
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					sx={{ mb: 2 }}
				>
					{recipe.name} has been deleted.
				</Alert>
			</Collapse>
			{user?.uid === recipe.user && (
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={4} lg={3}>
						<Button
							onClick={() => {
								if (
									window.confirm('Are you sure you want to delete this recipe?')
								) {
									handleDelete();
									setOpen(true);
								}
							}}
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
							state={{ recipeProp: recipe }}
							variant="contained"
							color="primary"
						>
							Edit
						</Button>
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default RecipeDetail;

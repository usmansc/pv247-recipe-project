import {
	TextField,
	Button,
	Stack,
	Typography,
	Divider,
	Paper
} from '@mui/material';
import { Box } from '@mui/system';
import { useLocation } from 'react-router';

import TagGrid from '../components/TagGrid';
import useInitializeRecipe from '../hooks/useInitializeRecipe';
import { Recipe } from '../utils/firebase';

const AddRecipe = () => {
	const location = useLocation();
	const { recipeProp } = (location.state as { recipeProp: Recipe }) ?? {};

	const {
		tag,
		recipe,
		unit,
		amount,
		ingredient,
		addTagToRecipe,
		addIngredientToRecipe,
		addRecipe,
		handleAmountChange,
		handleUnitChange,
		handleTagClick,
		handleIngredientClick,
		handleNameChange,
		handleIngredientChange,
		handleTagChange,
		handleDescriptionChange,
		handleImageChange,
		handleSubmit
	} = useInitializeRecipe(recipeProp);

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				id="outlined-search"
				label="Name"
				type="search"
				fullWidth
				value={recipe.name}
				onChange={handleNameChange}
				required
			/>
			<TextField
				id="outlined-search"
				label="Description"
				type="search"
				multiline
				rows={5}
				fullWidth
				value={recipe.description}
				onChange={handleDescriptionChange}
				required
			/>
			<TextField
				id="outlined-search"
				label="Image URL"
				type="search"
				fullWidth
				value={recipe.image}
				onChange={handleImageChange}
				required
			/>
			<Stack direction="row" spacing={2}>
				<TextField
					id="outlined-search"
					label="Recipe Tag"
					type="search"
					fullWidth
					value={tag.name}
					onChange={handleTagChange}
				/>
				{tag.name && (
					<Button type="submit" onClick={addTagToRecipe}>
						Add Tag
					</Button>
				)}
			</Stack>
			<TextField
				id="outlined-search"
				label="Ingredient"
				type="search"
				fullWidth
				value={ingredient.name}
				onChange={handleIngredientChange}
			/>
			<Stack direction="row" spacing={2}>
				<TextField
					id="outlined-search"
					label="Amount"
					type="search"
					fullWidth
					value={amount.value}
					onChange={handleAmountChange}
					inputMode="numeric"
					defaultValue={0}
				/>
				<TextField
					id="outlined-search"
					label="Unit"
					type="search"
					fullWidth
					value={unit}
					onChange={handleUnitChange}
				/>
				{ingredient.name && amount.value && unit && (
					<Button type="submit" onClick={addIngredientToRecipe}>
						Add Ingredient
					</Button>
				)}
			</Stack>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Divider sx={{ width: '100%', maxWidth: '500px', height: '34px' }} />
			</Box>
			<Typography variant="h6">Active Tags</Typography>
			<TagGrid tags={recipe.tags} onClick={handleTagClick} />
			<Typography variant="h6">Active Ingredients</Typography>
			<TagGrid tags={recipe.ingredients} onClick={handleIngredientClick} />
			<Typography variant="h6">Image Preview</Typography>
			{recipe.image && (
				<img src={recipe.image} alt="Not found" width={200} height={200} />
			)}
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Divider sx={{ width: '100%', maxWidth: '500px', height: '34px' }} />
			</Box>
			<Button type="submit" onClick={addRecipe} variant="contained">
				{recipeProp ? 'Update Recipe' : 'Add Recipe'}
			</Button>
		</form>
	);
};

export default AddRecipe;

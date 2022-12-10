import { TextField, Button, Stack } from '@mui/material';
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
			/>
			<TextField
				id="outlined-search"
				label="Image URL"
				type="search"
				fullWidth
				value={recipe.image}
				onChange={handleImageChange}
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

			<TagGrid tags={recipe.tags} onClick={handleTagClick} />
			<TagGrid tags={recipe.ingredients} onClick={handleIngredientClick} />
			<Button type="submit" onClick={addRecipe}>
				{recipeProp ? 'Update Recipe' : 'Add Recipe'}
			</Button>
		</form>
	);
};

export default AddRecipe;

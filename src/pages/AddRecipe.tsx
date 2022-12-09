// Page that will have a form to add a recipe
// Recipe will be added to the database
// Recipe will be added to the user's list of recipes
// User will be redirected to the recipe page

import { TextField, Button, Stack } from '@mui/material';
import {
	addDoc,
	deleteDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { RecipeType } from '../components/RecipeCard';
import TagGrid from '../components/TagGrid';
import useLoggedInUser from '../hooks/useLoggedInUser';
import {
	Ingredient,
	Amount,
	Recipe,
	Tag,
	ingredientsCollection,
	amountsCollection,
	recipesCollection,
	tagsCollection
} from '../utils/firebase';

// Accept prop for recipe to edit

const AddRecipe = () => {
	const location = useLocation();
	const { recipeProp } = (location.state as { recipeProp: Recipe }) ?? {};
	// Function that generates unique id
	const genUniqueId = () => {
		const dateStr = Date.now().toString(36); // convert num to base 36 and stringify

		const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point

		return `${dateStr}-${randomStr}`;
	};

	const [ingredientId, setIngredientId] = useState<string>(genUniqueId());

	const user = useLoggedInUser();
	const [tag, setTag] = useState<Tag>({ id: genUniqueId(), name: '' });
	const [recipe, setRecipe] = useState<Recipe>(
		recipeProp
			? recipeProp
			: {
					id: genUniqueId(),
					user: user?.uid ?? '',
					name: '',
					description: '',
					image: '',
					tags: [],
					ingredients: []
			  }
	);
	const [unit, setUnit] = useState<string>('');
	const [amount, setAmount] = useState<Amount>({
		id: genUniqueId(),
		ingredient: ingredientId,
		value: 0,
		unit
	});
	const [ingredient, setIngredient] = useState<Ingredient>({
		id: ingredientId,
		recipe: recipe.id,
		name: '',
		amount
	});

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAmount({ ...amount, value: parseInt(event.target.value) });
	};

	const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUnit(event.target.value);
	};

	// Function that is callback for when user clicks on the tag in the grid
	// It will remove the tag from the grid
	const handleTagClick = (tag: string) => {
		const newTags = recipe.tags.filter(t => t.name !== tag);
		setRecipe({ ...recipe, tags: newTags });
	};

	// Function that is callback for when user clicks on the ingredient in the grid
	// It will remove the ingredient from the grid
	const handleIngredientClick = (ingredient: string) => {
		const newIngredients = recipe.ingredients.filter(
			i => i.name !== ingredient
		);
		setRecipe({ ...recipe, ingredients: newIngredients });
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRecipe({ ...recipe, name: event.target.value });
	};

	const handleIngredientChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setIngredient({ ...ingredient, name: event.target.value });
	};

	const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTag({ ...tag, name: event.target.value });
	};

	const handleDescriptionChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRecipe({ ...recipe, description: event.target.value });
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRecipe({ ...recipe, image: event.target.value });
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(recipe);
	};

	const addTagToRecipe = () => {
		const newTags = [...recipe.tags, tag];
		setRecipe({ ...recipe, tags: newTags });
		setTag({ id: genUniqueId(), name: '' });
	};

	const addIngredientToRecipe = () => {
		ingredient.amount.unit = unit;
		ingredient.amount = amount;
		const newIngredients = [...recipe.ingredients, ingredient];
		setRecipe({ ...recipe, ingredients: newIngredients });
		setIngredientId(genUniqueId());
		setUnit('');
		setAmount({
			id: genUniqueId(),
			ingredient: ingredientId,
			value: 0,
			unit
		});
		setIngredient({
			id: ingredientId,
			recipe: recipe.id,
			name: '',
			amount
		});
	};

	const updateRecipe = async () => {
		// Find recipe, update it with new values
		const q = query(recipesCollection, where('id', '==', recipe.id));

		// Get the first document in the collection
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => {
			updateDoc(doc.ref, recipe);
		});
	};

	const createRecipe = () => {
		addDoc(recipesCollection, recipe);
		recipe.ingredients.forEach(ingredient => {
			addDoc(ingredientsCollection, ingredient);
		});

		recipe.tags.forEach(tag => {
			addDoc(tagsCollection, tag);
		});

		recipe.ingredients.forEach(ingredient => {
			addDoc(amountsCollection, ingredient.amount);
		});
	};

	const addRecipe = () => {
		recipeProp ? updateRecipe() : createRecipe();
	};

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
			{
				// Search field for tags horizontally with add tag button

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
			}
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

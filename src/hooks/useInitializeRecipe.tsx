import { query, where, getDocs, updateDoc, addDoc } from 'firebase/firestore';
import { useState } from 'react';

import {
	Recipe,
	Tag,
	Amount,
	Ingredient,
	amountsCollection,
	ingredientsCollection,
	recipesCollection,
	tagsCollection
} from '../utils/firebase';

import useLoggedInUser from './useLoggedInUser';

const useInitializeRecipe = (recipeProp: Recipe) => {
	const addTagToRecipe = () => {
		const newTags = [...recipe.tags, tag];
		setRecipe({ ...recipe, tags: newTags });
		setTag({ id: genUniqueId(), name: '' });
	};

	const addIngredientToRecipe = (name: string, calories: number) => {
		ingredient.name = name;
		ingredient.amount.unit = unit;
		ingredient.amount = amount;
		ingredient.energy = calories;
		const newIngredients = [...recipe.ingredients, ingredient];
		setRecipe({ ...recipe, ingredients: newIngredients });
		setIngredientId(genUniqueId());
		setUnit('Grams');
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
			amount,
			energy: 0
		});
	};

	const updateRecipe = async () => {
		const q = query(recipesCollection, where('id', '==', recipe.id));
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

	const genUniqueId = () => {
		const dateStr = Date.now().toString(36);

		const randomStr = Math.random().toString(36).substring(2, 8);

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
	const [unit, setUnit] = useState<string>('Grams');
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
		amount,
		energy: 0
	});

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAmount({ ...amount, value: parseInt(event.target.value) });
	};

	const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUnit(event.target.value);
	};

	const handleTagClick = (tag: string) => {
		const newTags = recipe.tags.filter(t => t.id !== tag);
		setRecipe({ ...recipe, tags: newTags });
	};

	const handleIngredientClick = (ingredient: string) => {
		console.log(ingredient);
		const newIngredients = recipe.ingredients.filter(i => i.id !== ingredient);
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
	};

	return {
		tag,
		recipe,
		unit,
		amount,
		ingredient,
		ingredientId,
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
	};
};

export default useInitializeRecipe;

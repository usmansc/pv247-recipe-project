import { addDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useCallback, useState } from 'react';

import {
	Amount,
	amountsCollection,
	Ingredient,
	ingredientsCollection,
	Recipe,
	recipesCollection,
	Tag,
	tagsCollection
} from '../utils/firebase';

import useLoggedInUser from './useLoggedInUser';

const genUniqueId = () => {
	const dateStr = Date.now().toString(36);
	const randomStr = Math.random().toString(36).substring(2, 8);
	return `${dateStr}-${randomStr}`;
};

const useInitializeRecipe = (recipeProp: Recipe) => {
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

	const addTagToRecipe = useCallback(() => {
		const newTags = [...recipe.tags, tag];
		setRecipe({ ...recipe, tags: newTags });
		setTag({ id: genUniqueId(), name: '' });
	}, [setRecipe, setTag, tag, recipe]);

	const addIngredientToRecipe = useCallback(
		(name: string, calories: number) => {
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
		},
		[recipe, ingredient, ingredientId, unit, amount]
	);

	const updateRecipe = useCallback(async () => {
		const q = query(recipesCollection, where('id', '==', recipe.id));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(doc => {
			updateDoc(doc.ref, recipe);
		});
	}, [recipe]);

	const createRecipe = useCallback(async () => {
		await Promise.all([
			addDoc(recipesCollection, recipe),
			...recipe.ingredients.map(ingredient =>
				addDoc(ingredientsCollection, ingredient)
			),
			...recipe.tags.map(tag => addDoc(tagsCollection, tag)),
			...recipe.ingredients.map(ingredient =>
				addDoc(amountsCollection, ingredient.amount)
			)
		]);
	}, [recipe]);

	const addRecipe = useCallback(() => {
		const callback = recipeProp ? updateRecipe : createRecipe;
		callback().catch(error => {
			alert('Failed to add recipe');
			console.error('Failed to add recipe', error);
		});
	}, [recipeProp, updateRecipe, createRecipe]);

	const handleAmountChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const parsed = parseInt(event.target.value);
			setAmount(prev => ({ ...prev, value: isNaN(parsed) ? 0 : parsed }));
		},
		[amount, setAmount]
	);

	const handleUnitChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setUnit(event.target.value);
		},
		[setUnit]
	);

	const handleTagClick = useCallback(
		(tag: string) => {
			setRecipe(prev => ({
				...prev,
				tags: prev.tags.filter(t => t.id !== tag)
			}));
		},
		[recipe, setRecipe]
	);

	const handleIngredientClick = useCallback(
		(ingredient: string) => {
			setRecipe(prev => ({
				...prev,
				ingredients: prev.ingredients.filter(i => i.id !== ingredient)
			}));
		},
		[recipe, setRecipe]
	);

	const handleNameChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setRecipe(prev => ({ ...prev, name: event.target.value }));
		},
		[setRecipe]
	);

	const handleIngredientChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setIngredient(prev => ({ ...prev, name: event.target.value }));
		},
		[setIngredient]
	);

	const handleTagChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setTag(prev => ({ ...prev, name: event.target.value }));
		},
		[setTag]
	);

	const handleDescriptionChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setRecipe(prev => ({ ...prev, description: event.target.value }));
		},
		[setRecipe]
	);

	const handleImageChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setRecipe(prev => ({ ...prev, image: event.target.value }));
		},
		[setRecipe]
	);

	const handleSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
		},
		[]
	);

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

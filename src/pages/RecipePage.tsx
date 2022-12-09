import {
	Button,
	Container,
	Stack,
	TextField,
	Typography
} from '@mui/material';
import {
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	where
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import RecipeDetail from '../components/RecipeDetail';
import RecipeGrid from '../components/RecipeGrid';
import TagGrid from '../components/TagGrid';
import useLoggedInUser from '../hooks/useLoggedInUser';
import {
	amountsCollection,
	favoritesCollection,
	ingredientsCollection,
	Recipe,
	recipesCollection,
	Tag,
	tagsCollection
} from '../utils/firebase';

const RecipePage = () => {
	const { id } = useParams();
	const user = useLoggedInUser();
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [tags, setTags] = useState<Tag[]>([]);
	const [recipe, setRecipe] = useState<Recipe>({
		id: '',
		user: user?.uid ?? '',
		name: '',
		description: '',
		image: '',
		tags: [],
		ingredients: []
	});

	useEffect(() => {
		const getTags = async () => {
			const querySnapshot = await getDocs(tagsCollection);
			const tags: Tag[] = [];
			querySnapshot.forEach(doc => {
				tags.push(doc.data() as Tag);
			});
			setTags(tags);
		};
		getTags();
	}, []);

	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

	const showFavorites = async () => {
		if (filteredRecipes.length !== 0) {
			setFilteredRecipes([]);
			return;
		}
		if (!user) return;
		const docRef = doc(favoritesCollection, user.uid);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const data = docSnap.data();
			recipes.forEach(recipe => {
				if (data[recipe.id]) {
					setFilteredRecipes([...filteredRecipes, recipe]);
				}
			});
		}
	};

	useEffect(() => {
		const getRecipes = async () => {
			const querySnapshot = await getDocs(recipesCollection);
			const recipes: Recipe[] = [];
			querySnapshot.forEach(doc => {
				if (doc.data().id === id && id) {
					setRecipe(doc.data() as Recipe);
				}
				recipes.push(doc.data() as Recipe);
			});
			setRecipes(recipes);
		};
		return () => {
			getRecipes();
		};
	}, []);

	{
		return !id ? (
			<Container>
				<Stack spacing={2}>
					<Typography variant="h2">Recipe</Typography>
					<Button onClick={showFavorites} variant="contained" color="primary">
						{filteredRecipes.length === 0 ? 'Show favorites' : 'Show all'}
					</Button>
				</Stack>

				<TextField
					id="outlined-search"
					label="Search field"
					type="search"
					fullWidth
				/>
				<TagGrid
					tags={tags}
					onClick={name => {
						setFilteredRecipes(
							recipes.filter(recipe =>
								recipe.tags.some(tag => tag.name === name)
							)
						);
					}}
				/>
				<RecipeGrid
					recipes={filteredRecipes.length === 0 ? recipes : filteredRecipes}
				/>
			</Container>
		) : (
			<Container>
				<Typography variant="h2">{recipe.name}</Typography>
				<RecipeDetail
					recipe={recipe}
					deleteRecipe={() => {
						// Get reference to the document to delete and delete it
						// Find document that has attribute id equal to id

						const q = query(recipesCollection, where('id', '==', id));
						const querySnapshot = getDocs(q);
						querySnapshot.then(querySnapshot => {
							querySnapshot.forEach(doc => {
								deleteDoc(doc.ref);
							});
						});

						// Go through all ingredients in recipe and delete them

						recipe.ingredients.forEach(ingredient => {
							const amounts = query(
								amountsCollection,
								where('id', '==', ingredient.id)
							);
							const querySnapshot = getDocs(amounts);
							querySnapshot.then(querySnapshot => {
								querySnapshot.forEach(doc => {
									deleteDoc(doc.ref);
								});
							});
							const ingredients = query(
								ingredientsCollection,
								where('id', '==', ingredient.id)
							);
							const querySnapshot2 = getDocs(ingredients);
							querySnapshot2.then(querySnapshot => {
								querySnapshot.forEach(doc => {
									deleteDoc(doc.ref);
								});
							});
						});
					}}
				/>
			</Container>
		);
	}
};

export default RecipePage;

import { Button, Container, Stack, Typography } from '@mui/material';
import {
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	where
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
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
	tagsCollection,
	userDocument
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

	const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
	const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

	useEffect(() => {
		if (!user) {
			return;
		}

		const getUserTags = async () => {
			const document = userDocument(user.uid);
			const userData = await (await getDoc(document)).data();
			const innerFiltered: Tag[] = userData?.filteredTags ?? [];
			setFilteredTags(innerFiltered);
		};

		getUserTags();
	}, [user]);

	useEffect(() => {
		const getTags = async () => {
			const querySnapshot = await getDocs(tagsCollection);
			const tags: Tag[] = [];

			querySnapshot.forEach(doc => {
				if (!tags.some(tag => tag.name === doc.data().name)) {
					tags.push(doc.data() as Tag);
				}
			});

			setTags(tags);
		};
		getTags();
	}, []);

	const showFavorites = async () => {
		if (filteredRecipes.length !== 0) {
			setFilteredRecipes([]);
			setFilteredTags([]);
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
				// Push each recipe into the array
				recipes.push(doc.data() as Recipe);
			});
			setRecipes(recipes);
		};
		getRecipes();
	}, []);

	useEffect(() => {
		if (filteredTags.length === 0) {
			setFilteredRecipes(recipes);
			return;
		}
		const filteredRecipes = filteredTags.reduce((acc, tag) => {
			const recipesWithTag = recipes.filter(recipe =>
				recipe.tags.some(t => t.name === tag.name)
			);
			return [...acc, ...recipesWithTag];
		}, [] as Recipe[]);
		setFilteredRecipes(filteredRecipes);
	}, [filteredTags]);

	{
		return !id ? (
			<Container>
				<Stack spacing={2}>
					<Typography variant="h2">Recipe</Typography>
					<Button onClick={showFavorites} variant="contained" color="primary">
						{!user
							? 'Show all'
							: filteredRecipes.length === 0
							? 'Show favorites'
							: 'Show all'}
					</Button>
				</Stack>
				<TagGrid
					tags={tags}
					filteredTags={filteredTags}
					onClick={id => {
						if (!id) return;
						const tag = tags.find(tag => tag.id === id);
						if (tag) {
							if (filteredTags.some(tag => tag.id === id)) {
								// Remove tag from filteredTags
								setFilteredTags(filteredTags.filter(tag => tag.id !== id));
								setFilteredRecipes(
									filteredTags
										.filter(tag => tag.id !== id)
										.reduce((acc, tag) => {
											const recipesWithTag = recipes.filter(recipe =>
												recipe.tags.some(t => t.id === tag.id)
											);
											return [...acc, ...recipesWithTag];
										}, [] as Recipe[])
								);
							} else {
								setFilteredTags([...filteredTags, tag]);
								setFilteredRecipes(
									[...filteredTags, tag].reduce((acc, tag) => {
										const recipesWithTag = recipes.filter(recipe =>
											recipe.tags.some(t => t.id === tag.id)
										);
										return [...acc, ...recipesWithTag];
									}, [] as Recipe[])
								);
							}
						}
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

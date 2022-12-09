import { Favorite } from '@mui/icons-material';
import {
	Button,
	Chip,
	Typography,
	Stack,
	Card,
	CardMedia,
	CardActionArea,
	CardContent,
	CardActions,
	ListItem,
	IconButton
} from '@mui/material';
import {
	deleteField,
	doc,
	getDoc,
	query,
	setDoc,
	updateDoc,
	where
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import {
	favoritesCollection,
	favoritesDocument,
	Recipe,
	recipesCollection
} from '../utils/firebase';

export type RecipeType = {
	id: number;
	name: string;
	description: string;
	tags: string[];
	image: string;
	ingredietns: string[];
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
	const user = useLoggedInUser();
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		if (!user) return;
		const getFavorites = async () => {
			const docRef = doc(favoritesCollection, user.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				for (const key in data) {
					if (data[key] === recipe.id) {
						setIsFavorite(true);
						break;
					}
				}
			}
		};
		getFavorites();
	}, [user, recipe.id]);

	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardMedia
					component="img"
					image={recipe.image}
					alt={recipe.name}
					sx={{
						objectFit: 'cover',
						width: '100%',
						maxHeight: 350
					}}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{recipe.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{recipe.description}
					</Typography>
					<Stack direction="row" spacing={0}>
						{recipe.tags.map(tag => (
							<ListItem key={tag.name}>
								<Chip label={tag.name} />
							</ListItem>
						))}
					</Stack>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Stack direction="row" spacing={1}>
					<Button
						component={Link}
						to={`/recipe/${recipe.id}`}
						size="small"
						color="primary"
					>
						See more
					</Button>
					<IconButton
						aria-label="add to favorites"
						onClick={() => {
							// In favoritesCollection, add this recipe id to the favorite list of the user
							// If the user does not have a favorite list, create one
							// Structure of favoritesCollection: - userId: { recipeId1, recipeId2, ... }
							if (!user) return;
							if (isFavorite) {
								// Remove from favorites
								updateDoc(favoritesDocument(user?.uid ?? ''), {
									[recipe.id]: deleteField()
								});
								setIsFavorite(false);
								return;
							}
							updateDoc(favoritesDocument(user?.uid ?? ''), {
								[recipe.id]: recipe.id
							});
							setIsFavorite(true);
						}}
					>
						<Favorite sx={{ color: isFavorite ? 'red' : 'grey' }} />
					</IconButton>
				</Stack>
			</CardActions>
		</Card>
	);
};

export default RecipeCard;

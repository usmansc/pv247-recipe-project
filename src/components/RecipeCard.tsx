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
import { deleteField, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import useFavorites from '../hooks/useFavorites';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { favoritesDocument, Recipe } from '../utils/firebase';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
	const user = useLoggedInUser();
	const [isFavorite, setIsFavorite] = useFavorites(recipe.id);

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
							if (!user) return;
							if (isFavorite) {
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

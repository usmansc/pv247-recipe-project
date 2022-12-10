import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Stack,
	ListItem,
	Chip,
	List
} from '@mui/material';

import { Recipe } from '../utils/firebase';

const RecipeDetailCard = ({ recipe }: { recipe: Recipe }) => (
	<Card>
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
			<List dense>
				{recipe.ingredients.map(ingredient => (
					<ListItem key={ingredient.name}>
						<Typography variant="body2" color="text.secondary">
							{`${ingredient.amount.value} ${ingredient.amount.unit} ${ingredient.name}`}
						</Typography>
					</ListItem>
				))}
			</List>
		</CardContent>
	</Card>
);

export default RecipeDetailCard;

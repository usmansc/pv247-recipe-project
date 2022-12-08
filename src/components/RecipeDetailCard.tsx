import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Stack,
	ListItem,
	Chip
} from '@mui/material';

import { RecipeType } from './RecipeCard';

const RecipeDetailCard = ({ recipe }: { recipe: RecipeType }) => (
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
					<ListItem key={tag}>
						<Chip label={tag} />
					</ListItem>
				))}
			</Stack>
		</CardContent>
	</Card>
);

export default RecipeDetailCard;

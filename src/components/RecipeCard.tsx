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
	ListItem
} from '@mui/material';

export type RecipeType = {
	id: number;
	name: string;
	description: string;
	tags: string[];
	image: string;
};

const RecipeCard = ({ recipe }: { recipe: RecipeType }) => (
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
						<ListItem key={tag}>
							<Chip label={tag} />
						</ListItem>
					))}
				</Stack>
			</CardContent>
		</CardActionArea>
		<CardActions>
			<Button size="large" color="primary">
				Check recipe details
			</Button>
		</CardActions>
	</Card>
);

export default RecipeCard;

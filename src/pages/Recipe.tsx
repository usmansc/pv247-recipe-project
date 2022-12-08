import {
	Box,
	Container,
	Grid,
	Paper,
	TextField,
	Typography
} from '@mui/material';
import { useParams } from 'react-router';

import RecipeCard, { RecipeType } from '../components/RecipeCard';
import RecipeDetail from '../components/RecipeDetail';
import RecipeGrid from '../components/RecipeGrid';
import TagGrid from '../components/TagGrid';

const Recipe = () => {
	const { id } = useParams();
	{
		return !id ? (
			<Container>
				<Typography variant="h2">Recipe</Typography>
				<TextField
					id="outlined-search"
					label="Search field"
					type="search"
					fullWidth
				/>
				<TagGrid tags={generateRandomTags(20)} />
				<RecipeGrid recipes={generateRandomRecipes(20)} />
			</Container>
		) : (
			<Container>
				<Typography variant="h2">Recipe</Typography>
				<RecipeDetail />
			</Container>
		);
	}
};

const generateRandomTags = (count: number): string[] => {
	const tags: string[] = [];

	for (let i = 0; i < count; i++) {
		// Push random string
		tags.push(`tag${i}`);
	}

	return tags;
};

const generateRandomRecipes = (count: number): RecipeType[] => {
	const recipes: RecipeType[] = [];

	for (let i = 0; i < count; i++) {
		recipes.push({
			id: i,
			name: `Recipe ${i}`,
			description: `Description ${i}`,
			tags: [`tag${i}`, `tag${i + 1}`],
			image: 'https://picsum.photos/400/300',
			ingredietns: [`apple`, `banana`, `orange`]
		});
	}

	return recipes;
};

export default Recipe;

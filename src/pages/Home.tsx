import { Paper, Typography } from '@mui/material';

import { Nutrient } from '../hooks/useFoodInfo';

import RecipePage from './RecipePage';

const Home = () => (
	<Paper>
		<RecipePage />
	</Paper>
);

export const formatNutrient = (data: Nutrient): string =>
	`${data.value ?? '-'}${data.unit}`;

export default Home;

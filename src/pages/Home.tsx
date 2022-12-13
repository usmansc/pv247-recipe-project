import { Paper } from '@mui/material';

import { Nutrient } from '../hooks/useFoodInfo';

import RecipePage from './RecipePage';

const Home = () => (
	<Paper sx={{ py: 4, px: 2 }}>
		<RecipePage />
	</Paper>
);

export const formatNutrient = (data: Nutrient): string =>
	`${data.value ?? '-'}${data.unit}`;

export default Home;

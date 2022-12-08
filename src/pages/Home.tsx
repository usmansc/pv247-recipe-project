import { Autocomplete, Paper, TextField, Typography } from '@mui/material';
import { useCallback } from 'react';

import useField from '../hooks/useField';
import { useFoodSuggestions } from '../hooks/useFoodSuggestions';
import { Nutrient, useFoodInfo } from '../hooks/useFoodInfo';

import Recipe from './Recipe';

const Home = () => {
	const [search, searchProps, setSearch] = useField('ingredient');
	const { options, loading } = useFoodSuggestions(search);
	const { data } = useFoodInfo(search);
	const onChange = useCallback(
		(_event: any, value: string | null) => {
			setSearch(value ?? '');
		},
		[setSearch]
	);
	return (
		<Paper>
			<Typography>Profile</Typography>
			<Autocomplete
				renderInput={params => (
					<TextField {...params} {...searchProps} label="Ingredient" />
				)}
				options={options}
				loading={loading}
				onChange={onChange}
			/>
			{data ? (
				<>
					<Typography>{data.name}</Typography>
					<Typography>Carbs: {formatNutrient(data.nutrients.carbs)}</Typography>
					<Typography>
						Energy: {formatNutrient(data.nutrients.energy)}
					</Typography>
					<Typography>Fat: {formatNutrient(data.nutrients.fat)}</Typography>
					<Typography>
						Protein: {formatNutrient(data.nutrients.protein)}
					</Typography>
					<Typography>Fiber: {formatNutrient(data.nutrients.fiber)}</Typography>
				</>
			) : (
				<Typography>UNKNOWN</Typography>
			)}
			<Recipe />
		</Paper>
	);
};

export const formatNutrient = (data: Nutrient): string =>
	`${data.value ?? '-'}${data.unit}`;

export default Home;

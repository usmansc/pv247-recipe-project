import {
	TextField,
	Button,
	Stack,
	Typography,
	Divider,
	Autocomplete,
	Collapse,
	Alert,
	IconButton
} from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';

import TagGrid from '../components/TagGrid';
import useField from '../hooks/useField';
import { useFoodInfo } from '../hooks/useFoodInfo';
import { useFoodSuggestions } from '../hooks/useFoodSuggestions';
import useInitializeRecipe from '../hooks/useInitializeRecipe';
import { Recipe } from '../utils/firebase';

import { formatNutrient } from './Home';

const AddRecipe = () => {
	const location = useLocation();
	const { recipeProp } = (location.state as { recipeProp: Recipe }) ?? {};
	const [search, searchProps, setSearch] = useField('ingredient', '');
	const { options, loading } = useFoodSuggestions(search);
	const { data } = useFoodInfo(search);
	const [open, setOpen] = useState(false);

	const onChange = useCallback(
		(_event: any, value: string | null) => {
			setSearch(value ?? '');
		},
		[setSearch]
	);

	const {
		tag,
		recipe,
		amount,
		addTagToRecipe,
		addIngredientToRecipe,
		addRecipe,
		handleAmountChange,
		handleTagClick,
		handleIngredientClick,
		handleNameChange,
		handleTagChange,
		handleDescriptionChange,
		handleImageChange,
		handleSubmit
	} = useInitializeRecipe(recipeProp);

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				id="outlined-search"
				label="Name"
				type="search"
				fullWidth
				value={recipe.name}
				onChange={handleNameChange}
				required
			/>
			<TextField
				id="outlined-search"
				label="Description"
				type="search"
				multiline
				rows={5}
				fullWidth
				value={recipe.description}
				onChange={handleDescriptionChange}
				required
			/>
			<TextField
				id="outlined-search"
				label="Image URL"
				type="search"
				fullWidth
				value={recipe.image}
				onChange={handleImageChange}
				required
			/>
			<Stack direction="row" spacing={2}>
				<TextField
					id="outlined-search"
					label="Recipe Tag"
					type="search"
					fullWidth
					value={tag.name}
					onChange={handleTagChange}
				/>
				{tag.name && (
					<Button type="submit" onClick={addTagToRecipe}>
						Add Tag
					</Button>
				)}
			</Stack>
			<Autocomplete
				renderInput={params => (
					<TextField {...params} {...searchProps} label="Ingredient" />
				)}
				options={options}
				loading={loading}
				onChange={onChange}
			/>
			{data && (
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
			)}
			<Stack direction="row" spacing={2}>
				<TextField
					id="outlined-search"
					label="Amount"
					type="search"
					fullWidth
					value={isNaN(amount.value) ? 0 : amount.value}
					onChange={handleAmountChange}
				/>
				<Typography variant="h6" sx={{ alignSelf: 'center' }}>
					GRAMS
				</Typography>

				{data?.name && amount.value && (
					<Button
						type="submit"
						onClick={() =>
							addIngredientToRecipe(
								data?.name ?? '',
								data.nutrients.energy.value ?? 0
							)
						}
					>
						Add Ingredient
					</Button>
				)}
			</Stack>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Divider sx={{ width: '100%', maxWidth: '500px', height: '34px' }} />
			</Box>
			<Typography variant="h6">Active Tags</Typography>
			<TagGrid tags={recipe.tags} filteredTags={[]} onClick={handleTagClick} />
			<Typography variant="h6">Active Ingredients</Typography>
			<TagGrid
				tags={recipe.ingredients}
				filteredTags={[]}
				onClick={handleIngredientClick}
			/>
			<Typography variant="h6">Image Preview</Typography>
			{recipe.image && (
				<img src={recipe.image} alt="Not found" width={200} height={200} />
			)}
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<Divider sx={{ width: '100%', maxWidth: '500px', height: '34px' }} />
			</Box>
			<Collapse in={open}>
				<Alert
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					sx={{ mb: 2 }}
				>
					{recipeProp
						? 'Recipe Updated, you can now go to the main page'
						: 'Recipe Added, you can now go to the main page'}
				</Alert>
			</Collapse>
			<Button
				type="submit"
				onClick={() => {
					addRecipe();
					// check if all required fields are filled
					if (
						recipe.name &&
						recipe.description &&
						recipe.image &&
						recipe.tags.length > 0 &&
						recipe.ingredients.length > 0
					) {
						setOpen(true);
					}
				}}
				variant="contained"
			>
				{recipeProp ? 'Update Recipe' : 'Add Recipe'}
			</Button>
		</form>
	);
};

export default AddRecipe;

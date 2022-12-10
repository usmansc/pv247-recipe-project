import { Box, Chip } from '@mui/material';
import { useCallback, useState } from 'react';

export type Category = {
	id: string;
	name: string;
};

type CategorySelectionProps = {
	categories: Category[];
	initialSelection: string[];
	onChange: (categories: string[]) => void;
};

export const CategorySelection = (props: CategorySelectionProps) => {
	const { categories, initialSelection, onChange } = props;
	const [selectedCategories, setSelectedCategories] =
		useState(initialSelection);

	const onClick = useCallback(
		(id: string) => {
			setSelectedCategories(prev => {
				const update = prev.includes(id)
					? prev.filter(c => c !== id)
					: [...prev, id];
				onChange(update);
				return update;
			});
		},
		[setSelectedCategories, onChange]
	);
	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				gap: 1
			}}
		>
			{categories.map((category: Category) => (
				<Chip
					key={category.id}
					label={category.name}
					color="primary"
					clickable
					onClick={() => onClick(category.id)}
					sx={{
						...(selectedCategories.includes(category.id)
							? {
									border: '1px solid',
									borderColor: 'transparent'
							  }
							: {})
					}}
					variant={
						selectedCategories.includes(category.id) ? 'filled' : 'outlined'
					}
				/>
			))}
		</Box>
	);
};

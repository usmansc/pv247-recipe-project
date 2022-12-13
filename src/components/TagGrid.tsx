import { Grid, Chip } from '@mui/material';
import { useState } from 'react';

import { Ingredient, Tag } from '../utils/firebase';

const TagGrid = (props: {
	tags: Tag[] | Ingredient[];
	filteredTags: Tag[] | Ingredient[];
	onClick: (tag: string) => void;
}) => {
	const { tags, filteredTags, onClick } = props;
	return (
		<Grid
			container
			spacing={1}
			sx={{
				'justifyContent': 'left',
				'alignItems': 'left',
				'flexWrap': 'wrap',
				'& > :not(style)': {
					m: 1
				},
				'paddingTop': 3,
				'paddingBottom': 3
			}}
		>
			{tags.map(tag => (
				<Grid item key={tag?.id}>
					<Chip
						label={tag?.name}
						color="primary"
						clickable
						onClick={() => {
							onClick(tag?.id);
						}}
						sx={{
							...(filteredTags.map(t => t?.id).includes(tag?.id)
								? {
										border: '1px solid',
										borderColor: 'transparent'
								  }
								: {})
						}}
						variant={
							filteredTags.map(t => t?.id).includes(tag?.id)
								? 'filled'
								: 'outlined'
						}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default TagGrid;

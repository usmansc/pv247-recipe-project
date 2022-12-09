import { Grid, Chip } from '@mui/material';

import { Ingredient, Tag } from '../utils/firebase';

const TagGrid = (props: {
	tags: Tag[] | Ingredient[];
	onClick: (tag: string) => void;
}) => {
	const { tags, onClick } = props;
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
				<Grid item key={tag.id}>
					<Chip label={tag.name} onClick={() => onClick(tag.name)} />
				</Grid>
			))}
		</Grid>
	);
};

export default TagGrid;

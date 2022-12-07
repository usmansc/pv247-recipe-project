// Grid of tags(strings), tags are chips from mui
// array of strings is passed as prop

import { Grid, Chip } from '@mui/material';

const TagGrid = (props: { tags: string[] }) => {
	const { tags } = props;
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
				<Grid item key={tag}>
					<Chip label={tag} />
				</Grid>
			))}
		</Grid>
	);
};

export default TagGrid;

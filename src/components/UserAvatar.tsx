import React from 'react';
import { Avatar } from '@mui/material';

export type UserAvatarProps = {
	name: string;
};

const stringToColor = (string: string) => {
	let hash = 0;
	let i;

	/* eslint-disable no-bitwise */
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = '#';

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	/* eslint-enable no-bitwise */

	return color;
};

const stringAvatar = (name: string) => {
	const initials = name
		.split(' ')
		.map(n => n[0])
		.join('')
		.slice(0, 3);
	return {
		sx: {
			width: 56,
			height: 56,
			bgcolor: stringToColor(name ? name : 'UNKNOWN')
		},
		children: initials ? initials : '?'
	};
};

export const UserAvatar = (props: UserAvatarProps) => (
	<Avatar {...stringAvatar(props.name)} />
);

import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';

import { UserAvatar } from '../components/UserAvatar';
import useField from '../hooks/useField';
import { emailValidator, requiredValidator } from '../utils/validation';
import useLoggedInUser from '../hooks/useLoggedInUser';
import {
	Recipe,
	recipesCollection,
	Tag,
	tagsCollection,
	updateUserData,
	updateUserEmail,
	userDocument
} from '../utils/firebase';
import RecipeGrid from '../components/RecipeGrid';
import TagGrid from '../components/TagGrid';

const Profile = () => {
	const user = useLoggedInUser();
	const [displayName, displayNameProps] = useField(
		'display-name',
		user?.displayName ?? ''
	);
	const [email, emailProps] = useField(
		'email',
		user?.email ?? '',
		requiredValidator,
		emailValidator
	);

	useEffect(() => {
		if (!user) {
			return;
		}

		const getUserTags = async () => {
			const document = userDocument(user.uid);
			const userData = await (await getDoc(document)).data();
			const filteredTags = userData?.filteredTags ?? [];
			setFilteredTags(filteredTags);
		};

		getUserTags();
	}, [user]);

	const onUserDataSaved = useCallback(() => {
		if (!user) {
			return;
		}
		Promise.all([
			updateUserData(user, { displayName }),
			updateUserEmail(user, email)
		]).catch(console.error);
	}, [user, displayName, email]);
	const [tags, setTags] = useState<Tag[]>([]);
	useEffect(() => {
		const getTags = async () => {
			const querySnapshot = await getDocs(tagsCollection);
			const tags: Tag[] = [];
			querySnapshot.forEach(doc => {
				if (!tags.some(tag => tag.name === doc.data().name)) {
					tags.push(doc.data() as Tag);
				}
			});
			setTags(tags);
		};
		getTags();
	}, []);

	const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

	const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);

	useEffect(() => {
		if (!user) {
			return;
		}
		const getUserRecipes = async () => {
			const q = query(recipesCollection, where('user', '==', user.uid));
			const querySnapshot = getDocs(q);
			querySnapshot.then(querySnapshot => {
				const recipes: Recipe[] = [];
				querySnapshot.forEach(doc => {
					recipes.push(doc.data() as Recipe);
				});
				setUserRecipes(recipes);
			});
		};
		getUserRecipes();
	}, [user]);

	return (
		<Paper sx={{ p: 4 }}>
			<Typography variant="h4" component="h2" mb={3}>
				My Profile
			</Typography>
			<Grid container spacing={3} alignItems="center">
				<Grid item xs={12} md={1}>
					<UserAvatar name={displayName} />
				</Grid>
				<Grid item xs={12} md={11}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								label="Display Name"
								sx={styles.field}
								{...displayNameProps}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField label="Email" {...emailProps} sx={styles.field} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant="contained" color="primary" onClick={onUserDataSaved}>
						Save
					</Button>
				</Grid>
			</Grid>
			<Typography variant="h5" component="h3" my={3} mb={1}>
				Favorite Tags
			</Typography>
			<TagGrid
				tags={tags}
				filteredTags={filteredTags}
				onClick={id => {
					if (!id) return;

					const tag = tags.find(tag => tag.id === id);
					if (tag && user) {
						const name = tag.name;
						// Update the filteredTags state by adding or removing the tag
						if (filteredTags.some(tag => tag.name === name)) {
							setFilteredTags(filteredTags.filter(tag => tag.name !== name));
							setDoc(userDocument(user?.uid), {
								filteredTags: filteredTags.filter(tag => tag.name !== name)
							});
						} else {
							setFilteredTags([...filteredTags, tag]);
							setDoc(userDocument(user?.uid), {
								filteredTags: [...filteredTags, tag]
							});
						}
					}
				}}
			/>
			<Typography variant="h5" component="h3" my={3} mb={1}>
				My Recipes
			</Typography>
			<RecipeGrid recipes={userRecipes} />
		</Paper>
	);
};

const styles = {
	field: {
		width: '100%'
	}
};

export default Profile;

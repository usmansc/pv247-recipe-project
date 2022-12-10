import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { favoritesCollection } from '../utils/firebase';

import useLoggedInUser from './useLoggedInUser';

const useFavorites = (recipeId: string) => {
	const user = useLoggedInUser();
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		if (!user) return;
		const getFavorites = async () => {
			const docRef = doc(favoritesCollection, user.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				for (const key in data) {
					if (data[key] === recipeId) {
						setIsFavorite(true);
						break;
					}
				}
			}
		};
		getFavorites();
	}, [user, recipeId]);

	return [isFavorite, setIsFavorite] as const;
};

export default useFavorites;

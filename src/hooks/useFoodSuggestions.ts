import { useQuery } from 'react-query';

import { FoodClient } from '../utils/query';

type useFoodSuggestionsResult = {
	options: string[];
	loading: boolean;
};

export const useFoodSuggestions = (
	search: string
): useFoodSuggestionsResult => {
	const { isLoading, data } = useQuery(
		['foodSuggestions', search],
		fetchSuggestions(search)
	);
	return {
		options: isLoading ? [] : (data ?? []).slice(0, 6),
		loading: isLoading
	};
};

const fetchSuggestions = (search: string) => (): Promise<string[]> =>
	FoodClient.get('auto-complete', {
		params: {
			q: search
		}
	}).then(response => response.data);

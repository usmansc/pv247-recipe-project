import { QueryClient } from 'react-query';
import axios from 'axios';

import { Config } from './config';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
			retry: false,
			staleTime: 5 * 60 * 1000
		}
	}
});

export const FoodClient = axios.create({
	baseURL: Config.foodDB.url,
	params: {
		app_id: Config.foodDB.appId,
		app_key: Config.foodDB.appKey
	},
	headers: {
		'Content-type': 'application/json'
	}
});

import { useQuery } from 'react-query';

import { FoodClient } from '../utils/query';

export enum Unit {
	gram = 'g',
	milligram = 'mg',
	microgram = 'µg',
	kilocalorie = 'kcal'
}

export type Nutrient = {
	value?: number;
	unit: Unit;
};

export type FoodInfo = {
	name: string;
	image?: string;
	nutrients: {
		energy: Nutrient;
		protein: Nutrient;
		fat: Nutrient;
		carbs: Nutrient;
		fiber: Nutrient;
	};
};

type useFoodInfoResult = {
	data?: FoodInfo;
	loading: boolean;
};

export const useFoodInfo = (search: string): useFoodInfoResult => {
	const { isLoading, data } = useQuery(['foodInfo', search], fetchInfo(search));
	return {
		...(isLoading ? {} : { data }),
		loading: isLoading
	};
};

const fetchInfo = (search: string) => (): Promise<FoodInfo | undefined> =>
	FoodClient.get('api/food-database/v2/parser', {
		params: {
			ingr: search
		}
	}).then(response => {
		const parsed = response.data?.parsed;
		if (!parsed || parsed.length < 1) {
			return undefined;
		}
		const food = parsed[0]?.food;
		console.log(food);
		return {
			name: food.label,
			image: food.image,
			nutrients: {
				energy: { value: food.nutrients.ENERC_KCAL, unit: Unit.kilocalorie },
				protein: { value: food.nutrients.PROCNT, unit: Unit.gram },
				fat: { value: food.nutrients.FAT, unit: Unit.gram },
				carbs: { value: food.nutrients.CHOCDF, unit: Unit.gram },
				fiber: { value: food.nutrients.FIBTG, unit: Unit.gram }
			}
		};
	});

type ConfigType = {
	foodDB: {
		url: string;
		appKey: string;
		appId: string;
	};
};

export const Config: ConfigType = {
	foodDB: {
		url: process.env.REACT_APP_EDAMAM_BASE_URL!,
		appId: process.env.REACT_APP_EDAMAM_APP_ID!,
		appKey: process.env.REACT_APP_EDAMAM_APP_KEY!
	}
};

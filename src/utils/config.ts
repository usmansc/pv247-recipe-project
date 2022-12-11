type ConfigType = {
	foodDB: {
		url: string;
		appKey: string;
		appId: string;
	};
	firebase: {
		apiKey: string;
		authDomain: string;
		projectId: string;
		storageBucket: string;
		messagingSenderId: string;
		appId: string;
	};
};

export const Config: ConfigType = {
	foodDB: {
		url: process.env.REACT_APP_EDAMAM_BASE_URL!,
		appId: process.env.REACT_APP_EDAMAM_APP_ID!,
		appKey: process.env.REACT_APP_EDAMAM_APP_KEY!
	},
	firebase: {
		apiKey: process.env.REACT_APP_FIREBASE_API_KEY!,
		authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN!,
		projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
		storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET!,
		messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID!,
		appId: process.env.REACT_APP_FIREBASE_APP_ID!
	}
};

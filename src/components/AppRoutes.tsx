import { Route, Routes } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import Recipe from '../pages/Recipe';

const AppRoutes = () => {
	const user = useLoggedInUser();
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/recipe" element={<Recipe />} />
			<Route path="/recipe/:id" element={<Recipe />} />
			{user ? (
				<Route path="/profile" element={<Profile />} />
			) : (
				<Route path="/login" element={<Login />} />
			)}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
export default AppRoutes;

import { Route, Routes } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import RecipePage from '../pages/RecipePage';
import AddRecipe from '../pages/AddRecipe';

const AppRoutes = () => {
	const user = useLoggedInUser();
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/recipe" element={<RecipePage />} />
			<Route path="/recipe/:id" element={<RecipePage />} />
			<Route path="/edit/:id" element={<AddRecipe />} />
			{user && <Route path="/add" element={<AddRecipe />} />}
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

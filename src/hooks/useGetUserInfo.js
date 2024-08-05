export const useGetUserInfo = () => {
	try {
		const { name, profilePhoto, userID, isAuth } = JSON.parse(
			localStorage.getItem('auth')
		);
		return { name, profilePhoto, userID, isAuth };
	} catch (err) {
		return { isAuth: false };
	}
};

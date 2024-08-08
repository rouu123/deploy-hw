import './styles.css';

import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../config/fireabase';

import { useNavigate, Navigate } from 'react-router-dom';

import { useGetUserInfo } from '../../hooks/useGetUserInfo';

export const Auth = () => {
	const navigate = useNavigate();

	const { isAuth } = useGetUserInfo();

	if (isAuth) {
		return <Navigate to="/app" replace />;
	}

	const signInWithGoogle = async () => {
		const userCredentials = await signInWithPopup(auth, provider);
		const authInfo = {
			userID: userCredentials.user.uid,
			name: userCredentials.user.displayName,
			profilePhoto: userCredentials.user.photoURL,
			isAuth: true,
		};
		localStorage.setItem('auth', JSON.stringify(authInfo));
		navigate('/app');
	};

	return (
		<div className="auth-page">
			<h1>Login Page</h1>
			<p>Sign in with google to continue</p>
			<button onClick={signInWithGoogle}>Sign In With Google</button>
			<h2>deployed by roua</h2>
			<h3>added CI/CD</h3>
		</div>
	);
};

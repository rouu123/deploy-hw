import { db } from '../config/fireabase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

import { useGetUserInfo } from './useGetUserInfo';

export const useAddTransaction = () => {
	const transColRef = collection(db, 'transactions');
	const { userID } = useGetUserInfo();

	const addTransaction = async ({ desc, amount, isIncome }) => {
		await addDoc(transColRef, {
			userID,
			desc,
			amount,
			isIncome,
			createdAt: serverTimestamp(),
		});
	};

	return { addTransaction };
};

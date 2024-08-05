import { useEffect, useState } from 'react';

import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { db } from '../config/fireabase';

import { useGetUserInfo } from './useGetUserInfo';

export const useGetTransactions = () => {
	const [transactions, setTransactions] = useState([]);
	const [transactionsTotal, setTransactionsTotal] = useState({
		income: 0,
		expense: 0,
		balance: 0,
	});

	const tansactionsColRef = collection(db, 'transactions');
	const { userID } = useGetUserInfo();

	const getTransactions = async () => {
		let unsub;
		try {
			const transQuery = query(
				tansactionsColRef,
				where('userID', '==', userID),
				orderBy('createdAt')
			);

			unsub = onSnapshot(transQuery, (snapshot) => {
				let docs = [];
				let expense = 0;
				let income = 0;

				snapshot.forEach((doc) => {
					const data = doc.data();
					const id = doc.id;
					docs.push({ ...data, id });

					if (data.isIncome) {
						income += data.amount;
					} else {
						expense += data.amount;
					}
				});

				setTransactions(docs);
				setTransactionsTotal({
					income,
					expense,
					balance: income - expense,
				});
			});
		} catch (err) {
			console.log(err);
		}

		return () => unsub();
	};

	useEffect(() => {
		getTransactions();
	}, []);

	return { transactions, transactionsTotal };
};

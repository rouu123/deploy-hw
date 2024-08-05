import './styles.css';

import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { auth } from '../../config/fireabase';

import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { useAddTransaction } from '../../hooks/useAddTransaction';
import { useGetTransactions } from '../../hooks/useGetTransactions';

export const ExpenseTracker = () => {
	const { name, profilePhoto, isAuth } = useGetUserInfo();
	const { addTransaction } = useAddTransaction();
	const { transactions, transactionsTotal } = useGetTransactions();

	const navigate = useNavigate();

	const [desc, setDesc] = useState('');
	const [amount, setAmount] = useState(0);
	const [isIncome, setIsIncome] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();
		addTransaction({ desc, amount, isIncome });
		setDesc('');
		setAmount(0);
	};

	const signUserOut = async () => {
		try {
			await signOut(auth);
			localStorage.clear();
			navigate('/');
		} catch (err) {
			console.log(err);
		}
	};

	if (!isAuth) {
		return <Navigate to="/" replace />;
	}
	return (
		<div className="expensetracker-page">
			<div className="profile">
				<img alt="pfp" src={profilePhoto} />
				<h3>{name}</h3>
				<button onClick={signUserOut}>Logout</button>
			</div>
			<div className="totals">
				<h2>Balance: {transactionsTotal.balance}</h2>
				<h2>Total Incomes: {transactionsTotal.income}</h2>
				<h2>Total Expenses: {transactionsTotal.expense}</h2>
			</div>
			<div className="form">
				<form onSubmit={onSubmit} className="myForm">
					<input
						type="text"
						placeholder="description"
						onChange={(e) => setDesc(e.target.value)}
						value={desc}
						required
					/>
					<input
						type="number"
						placeholder="amount"
						onChange={(e) => {
							setAmount(Number(e.target.value));
						}}
						value={amount}
						required
					/>
					<div style={{ display: 'flex' }}>
						<div>
							<label htmlFor="expense">Expense</label>
							<input
								type="radio"
								id="expense"
								name="transType"
								onChange={() => setIsIncome(false)}
								checked={!isIncome}
							/>
						</div>
						<div>
							<label htmlFor="income">Income</label>
							<input
								type="radio"
								id="income"
								name="transType"
								onChange={() => setIsIncome(true)}
								checked={isIncome}
							/>
						</div>
					</div>
					<button type="submit">Add Transaction</button>
				</form>
			</div>
			<div className="transactions">
				{transactions.map((transaction) => {
					return (
						<div>
							<h3 style={{ color: transaction.isIncome ? 'green' : 'red' }}>
								{transaction.isIncome ? 'Income' : 'Expense'}
							</h3>
							<p>
								<i>{transaction.amount} TND</i>
							</p>
							<p>
								<b>{transaction.desc}</b>
							</p>
							<hr></hr>
						</div>
					);
				})}
			</div>
		</div>
	);
};

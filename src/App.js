import './App.css';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import { Auth } from './pages/Auth';
import { ExpenseTracker } from './pages/ExpenseTracker';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/app" element={<ExpenseTracker />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</Router>
	);
}

export default App;

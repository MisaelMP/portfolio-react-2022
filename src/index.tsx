import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/main.css';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './styles/generic/GlobalStyles';
import App from './App';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LandingPage />,
	},
	{
		path: '/About',
		element: <AboutPage />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<App>
			<RouterProvider router={router} />
		</App>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/main.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/About',
        element: <AboutPage />,
      },
      {
        path: '/Skillset',
        element: <SkillsPage />,
      },
      {
        path: '/Projects',
        element: <ProjectsPage />,
      },
      {
        path: '/Contact',
        element: <ContactPage />,
      }
    ],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

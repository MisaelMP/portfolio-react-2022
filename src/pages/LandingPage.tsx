import React from 'react';
import { useRef } from 'react';
import Scene, { MenuItem } from '../modules/interaction/components/menu-drop/Scene';

const menuItems: MenuItem[] = [
	{
		label: 'Misael M.',
		href: 'https://www.linkedin.com/in/misael-mercado/',
	},
	{
		label: 'CV',
		href: '/files/resume.pdf',
	},
];

const LandingPage: React.FC = () => {
	const sceneRef = useRef<{ reset: () => void }>(null);

	return (
		<>
			<Scene menuItems={menuItems} />
		</>
	);
};

export default LandingPage;

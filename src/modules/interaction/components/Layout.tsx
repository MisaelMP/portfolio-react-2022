// Layout.tsx
import { useEffect } from 'react';

interface LayoutProps {
	onResize: (size: { W: number; H: number }) => void;
}

const Layout: React.FC<LayoutProps> = ({ onResize }) => {
	useEffect(() => {
		const handleResize = () => {
			const W = window.innerWidth;
			const H = window.innerHeight;
			onResize({ W, H });
		};

		window.addEventListener('resize', handleResize);
		handleResize(); // Initial resize

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [onResize]);

	return null;
};

export default Layout;

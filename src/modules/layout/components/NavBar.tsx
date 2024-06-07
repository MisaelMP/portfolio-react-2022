import navbarItems from '../../../data/navbarItems.json';
import styles from '../../../styles/elements/navbar.module.css';
import { useEffect, useState } from 'react';

interface NavItemProps {
	title: string;
	href: string;
	children?: JSX.Element | JSX.Element[];
}

const Navbar = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery: string = '(min-width: 768px)';
		const mediaQueryMatch = window.matchMedia(mediaQuery);

		const handleClassByMediaQuery = (event: { matches: any }) => {
			const isDesktop = event.matches;
			setIsMobile(!isDesktop);
		};

		mediaQueryMatch.addEventListener('change', handleClassByMediaQuery);

		return () => {
			mediaQueryMatch.removeEventListener('change', handleClassByMediaQuery);
		};
	}, []);

	return (
		<nav className={`${styles.navbar} ${isMobile ? 'w-3/4' : 'w-full'}`}>
			<ul>
				{navbarItems &&
					navbarItems.map((item: NavItemProps, index: number) => (
						<li key={index}>
							<a href={item.href}>{item.title}</a>
						</li>
					))}
			</ul>
		</nav>
	);
};

export default Navbar;

import navbarItems from '../../../data/navbarItems.json';
import styles from '../../../styles/elements/navbar.module.css';
import { useEffect, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useGesture } from '@use-gesture/react';
import { Link } from 'react-router-dom';

interface NavItemProps {
	title: string;
	href: string;
	children?: JSX.Element | JSX.Element[];
}

const Navbar = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const mediaQuery = '(min-width: 768px)';
		const mediaQueryMatch = window.matchMedia(mediaQuery);

		const handleClassByMediaQuery = (event: { matches: any }) => {
			const isDesktop = event.matches;
			setIsMobile(!isDesktop);
			if (isDesktop) setIsMenuOpen(false); // Ensure menu is closed on desktop
		};

		mediaQueryMatch.addEventListener('change', handleClassByMediaQuery);

		// Initial check
		handleClassByMediaQuery(mediaQueryMatch);

		return () => {
			mediaQueryMatch.removeEventListener('change', handleClassByMediaQuery);
		};
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useGesture({
		onDrag: ({ movement: [mx], cancel }) => {
			if (mx > 100) {
				setIsMenuOpen(true);
				cancel();
			} else if (mx < -100) {
				setIsMenuOpen(false);
				cancel();
			}
		},
	});

	return (
		<nav className={`${styles.navbar}`}>
			<Link to='/'>
				<h1 className='font-bold font-montserrat text-center text-8xl'>Misael M.</h1>
			</Link>
			{isMobile && (
				<button onClick={toggleMenu} className={styles.navbarHamburger}>
					<Bars3Icon className={styles.navbarHamburgerIcon} />
				</button>
			)}
			<ul
				className={`${styles.navbarMenu} ${
					isMobile ? (isMenuOpen ? styles.navbarMenuOpen : styles.navbarMenuClosed) : ''
				}`}
			>
				{navbarItems &&
					navbarItems.map((item: NavItemProps, index: number) => (
						<li key={index}>
							<Link to={item.href}>{item.title}</Link>
						</li>
					))}
			</ul>
		</nav>
	);
};

export default Navbar;

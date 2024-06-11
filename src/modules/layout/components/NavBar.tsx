import navbarItems from '../../../data/navbarItems.json';
import styles from '../../../styles/elements/navbar.module.css';
import { useEffect, useState, useRef } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ReactComponent as Logo } from '../../../assets/icons/MisaelLogo1.svg'
import { Link } from 'react-router-dom';

interface NavItemProps {
	title: string;
	href: string;
	children?: JSX.Element | JSX.Element[];
}

const Navbar = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const isResizing = useRef(false);

	useEffect(() => {
		const mediaQuery = '(min-width: 768px)';
		const mediaQueryList = window.matchMedia(mediaQuery);

		// Handler to update states based on media query match
		const handleClassByMediaQuery = (event: MediaQueryListEvent) => {
			const isDesktop = event.matches;
			setIsMobile(!isDesktop);
			if (isDesktop) setIsMenuOpen(false); // Ensure menu is closed on desktop
			isResizing.current = true; // Set resizing flag to true
			setTimeout(() => (isResizing.current = false), 500);
		};

		mediaQueryList.addEventListener('change', handleClassByMediaQuery);

		// Initial check for setting isMobile state based on current screen size
		setIsMobile(!mediaQueryList.matches);

		return () => {
			mediaQueryList.removeEventListener('change', handleClassByMediaQuery);
		};
	}, []);

	// Toggle menu open/close state
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className={`${styles.navbar}`}>
			<Link onClick={() => setIsMenuOpen(false)} to='/'>
				<Logo />
			</Link>
			{isMobile && (
				<button onClick={toggleMenu} className={styles.navbarHamburger}>
					{isMenuOpen ? (
						<XMarkIcon className={styles.navbarHamburgerIcon} />
					) : (
						<Bars3Icon className={styles.navbarHamburgerIcon} />
					)}
				</button>
			)}
			<ul
				className={`${styles.navbarMenu} ${
					isMobile
						? isMenuOpen
							? styles.navbarMenuOpen
							: isResizing.current
							? styles.navbarMenuNoTransition
							: styles.navbarMenuClosed
						: ''
				}`}
			>
				{navbarItems &&
					navbarItems.map((item: NavItemProps, index: number) => (
						<li key={index}>
							<Link onClick={() => setIsMenuOpen(false)} to={item.href}>
								{item.title}
							</Link>
						</li>
					))}
			</ul>
		</nav>
	);
};

export default Navbar;

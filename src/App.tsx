import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './modules/layout/components/NavBar';
import Footer from './modules/layout/components/Footer';
import Section from './modules/common/components/Section';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

function App(): JSX.Element {
	const location = useLocation();
	const headerRef = useRef<HTMLDivElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const headerHeight = headerRef.current ? headerRef.current.offsetHeight : 0;
		const footerHeight = footerRef.current ? footerRef.current.offsetHeight : 0;
		const mainHeight = `calc(100vh - ${headerHeight}px - ${footerHeight}px)`;
		if (mainRef.current) {
			mainRef.current.style.height = mainHeight;
		}
	}, [location]);
	return (
		<div className='flex flex-col h-screen'>
			<header className='e-header' ref={headerRef}>
				<NavBar />
			</header>
			<main
				className='relative h-full w-full overflow-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200'
				data-canvas
				ref={mainRef}
			>
				<TransitionGroup className='h-screen lg:h-full overflow-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
					<CSSTransition timeout={200} classNames='fade' key={location.key}>
						<Outlet />
					</CSSTransition>
				</TransitionGroup>
			</main>
			<footer className='mt-auto z-20 w-full' ref={footerRef}>
				<Section section='footer'>
					<Footer />
				</Section>
			</footer>
		</div>
	);
}

export default App;

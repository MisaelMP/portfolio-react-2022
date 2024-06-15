import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './modules/layout/components/NavBar';
import Footer from './modules/layout/components/Footer';
import Section from './modules/common/components/Section';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Routes, Route, useLocation } from 'react-router-dom';

function App(): JSX.Element {
	const location = useLocation();

	useEffect(() => {
		const canvas = document.querySelector('[data-canvas]');
		if (canvas) {
			canvas.scrollTop = 0;
		}
	}, [location]);

	return (
		<div className='flex flex-col'>
			<header className='z-20'>
				<NavBar />
			</header>
			<main className='relative w-full h-full' data-canvas>
				<TransitionGroup className='h-full'>
					<CSSTransition timeout={200} classNames='fade' key={location.key}>
						<Outlet />
					</CSSTransition>
				</TransitionGroup>
			</main>
			<footer className='mt-auto z-20 w-full'>
				<Section section='footer'>
					<Footer />
				</Section>
			</footer>
		</div>
	);
}

export default App;

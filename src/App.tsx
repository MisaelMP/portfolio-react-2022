import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './modules/layout/components/NavBar';
import Footer from './modules/layout/components/Footer';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

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
			<main className='relative' data-canvas>
				<TransitionGroup className='min-h-screen h-full'>
					<CSSTransition timeout={200} classNames='fade' key={location.key}>
						<Outlet />
					</CSSTransition>
				</TransitionGroup>
			</main>
			<footer className='mt-auto z-10 w-full p-8 h-full flex flex-col items-center justify-center text-[var(--background-white)] bg-[var(--secondary-colour)]'>
				<Footer />
			</footer>
		</div>
	);
}

export default App;

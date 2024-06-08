import { Outlet } from 'react-router-dom';
import GlobalStyle from './styles/generic/GlobalStyles';
import NavBar from './modules/layout/components/NavBar';
import Footer from './modules/layout/components/Footer';
import Section from './modules/common/components/Section';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

function App(): JSX.Element {
	const location = useLocation();
	return (
		<div className='flex flex-col h-screen justify-start'>
			<GlobalStyle />
			<header className='e-header'>
				<NavBar />
			</header>
			<main className='relative h-full w-full' data-canvas>
				<TransitionGroup className="h-full">
					<CSSTransition timeout={200} classNames='fade' key={location.key}>
						<Outlet />
					</CSSTransition>
				</TransitionGroup>
			</main>
			<footer className='mt-auto z-20'>
				<Section section='footer'>
					<Footer />
				</Section>
			</footer>
		</div>
	);
}

export default App;

import { Outlet } from 'react-router-dom';
import GlobalStyle from './styles/generic/GlobalStyles';
import NavBar from './modules/layout/components/NavBar';
import Footer from './modules/layout/components/Footer';
import Section from './modules/common/components/Section';

function App(): JSX.Element {
	return (
		<div className='flex flex-col h-screen justify-start'>
			<GlobalStyle />
			<header className='e-header'>
				<NavBar />
			</header>
			<main className='relative h-full w-full' data-canvas>
				<Outlet />
			</main>
			<footer className='mt-auto'>
				<Section section='footer'>
					<Footer />
				</Section>
			</footer>
		</div>
	);
}

export default App;

import { Outlet, Link } from 'react-router-dom';
import GlobalStyle from './styles/generic/GlobalStyles';
import NavBar from './modules/layout/components/NavBar';
import Footer from './modules/layout/components/Footer';
import Section from './modules/common/components/Section';

function App(): JSX.Element {
	return (
		<div className='flex flex-col h-screen justify-start'>
			<GlobalStyle />
			<Link to='/'>
				<h1 className='font-bold font-montserrat text-center text-8xl'>Misael M.</h1>
			</Link>
			<header className='e-header'>
				<NavBar />
			</header>
			<Outlet />
			<footer className='mt-auto'>
				<Section section='footer'>
					<Footer />
				</Section>
			</footer>
		</div>
	);
}

export default App;

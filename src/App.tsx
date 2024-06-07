import GlobalStyle from './styles/generic/GlobalStyles';
import NavBar from './modules/layout/components/NavBar';
import Footer from './modules/layout/components/Footer';
import Section from './modules/common/components/Section';

import { Fragment, ReactNode } from 'react';

function App({ children }: { children: ReactNode }): JSX.Element {
	return (
		<div className="flex flex-col h-screen justify-start">
			<GlobalStyle />
			<a href='/'>
				<h1 className='font-bold font-montserrat text-center text-8xl'>Misael M.</h1>
			</a>
			<header className='e-header'>
				<NavBar />
			</header>
			{children}
			<footer className="mt-auto">
				<Section section='footer'>
					<Footer />
				</Section>
			</footer>
		</div>
	);
}

export default App;

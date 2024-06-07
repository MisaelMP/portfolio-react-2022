import GlobalStyle from './styles/generic/GlobalStyles';
import NavBar from './modules/layout/components/NavBar';
import Footer from './modules/layout/components/Footer';
import Section from './modules/common/components/Section';

import { Fragment, ReactNode } from 'react';

function App({ children }: { children: ReactNode }): JSX.Element {
	return (
		<Fragment>
			<GlobalStyle />
			<a href='/'>
				<h1 className='font-bold font-montserrat text-center text-8xl'>Misael M.</h1>
			</a>
			<header className='App-header'>
				<NavBar />
			</header>
			{children}
			<footer>
				<Section section='footer'>
					<Footer />
				</Section>
			</footer>
		</Fragment>
	);
}

export default App;

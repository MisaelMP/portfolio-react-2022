import GlobalStyle from './styles/generic/GlobalStyles';
import LandingPage from './pages/LandingPage';
import Blob from './modules/p5/components/Blob1';

function App() {
	return (
		<div className='App'>
			<Blob />
			<GlobalStyle />
			<LandingPage />
		</div>
	);
}

export default App;

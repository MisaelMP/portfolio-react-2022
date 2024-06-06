import GlobalStyle from "./styles/generic/GlobalStyles";
import LandingPage from "./pages/LandingPage";
import SketchComponent from './modules/p5/components/Blob';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
       <LandingPage />
       <header className='App-header'>
				<h1>Misael M.</h1>
				<SketchComponent />
			</header>
    </div>
  );
		
}

export default App;

import About from '../modules/sections/components/About';
import Blob from '../modules/p5/components/Blob';
import Contact from '../modules/sections/components/Contact';
import Footer from '../modules/layout/components/Footer';
import NavBar from '../modules/layout/components/NavBar';
import CardSection from '../modules/common/components/CardSection';
import SwipableCardsSections from '../modules/common/components/SwipableCardsSections';

const LandingPage = () => {
  return (
    <div>
      {/* <Blob /> */}
      <h1 className="ont-bold font-montserrat text-center text-8xl">Misael M.</h1>
      <header className="App-header">
        <NavBar />
      </header>
      {/* <CardSection title="About" section="about">
        <About />
      </CardSection>
      <CardSection title="Skillset" section="skillset">
        <div>something here 2</div>
      </CardSection>
      <CardSection title="Projects" section="projects">
        <div>something here 3</div>
      </CardSection>
      <CardSection title="Contact" section="contact">
        <Contact />
      </CardSection>
      <CardSection section="footer">
        <Footer />
      </CardSection> */}
    <SwipableCardsSections />
    </div>
  );
}

export default LandingPage;

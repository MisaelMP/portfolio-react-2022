import About from '../modules/sections/components/About';
import Blob from '../modules/p5/components/Blob';
import NavBar from '../modules/layout/components/NavBar';
import Footer from '../modules/layout/components/Footer';
import CardSection from '../modules/common/components/CardSection';
import styles from '../styles/layout.module.css';
import SwipableCardsSections from '../modules/common/components/SwipableCardsSections';

const LandingPage = () => {
  return (
    <div>
      {/* <Blob /> */}
      <h1 className='font-bold font-montserrat text-center text-8xl'>Misael M.</h1>
      <header className='App-header'>
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
   */}
      <div className={styles.container}>
        <SwipableCardsSections />
      </div>
      <CardSection section='footer'>
        <Footer />
      </CardSection>
    </div>
  );
};

export default LandingPage;

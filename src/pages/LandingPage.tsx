import About from 'src/modules/sections/components/About';
import Blob from 'src/modules/p5/components/Blob';
import Contact from 'src/modules/sections/components/Contact';
import Footer from 'src/modules/layout/components/Footer';
import NavBar from 'src/modules/layout/components/NavBar';
import Section from 'src/modules/common/components/Section';

const LandingPage = () => {
  return (
    <div>
      <Blob />
      <h1 className="ont-bold font-montserrat text-center text-8xl">Misael M.</h1>
      <header className="App-header">
        <NavBar />
      </header>
      <Section title="About" section="about">
        <About />
      </Section>
      <Section title="Skillset" section="skillset">
        <div>something here 2</div>
      </Section>
      <Section title="Projects" section="projects">
        <div>something here 3</div>
      </Section>
      <Section title="Contact" section="contact">
        <Contact />
      </Section>
      <Section section="footer">
        <Footer />
      </Section>
    </div>
  );
}

export default LandingPage;

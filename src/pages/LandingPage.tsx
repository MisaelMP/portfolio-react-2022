import About from 'src/modules/sections/components/About';
import Blob from 'src/modules/p5/components/Blob.js';
import NavBar from 'src/modules/common/components/NavBar';
import Section from 'src/modules/common/components/Section';

const LandingPage = () => {
  return (
    <div>
      <Blob />
      <h1>Misael M.</h1>
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
        <div>something here 4</div>
      </Section>
    </div>
  );
}

export default LandingPage;

import NavBar from '../modules/common/components/NavBar';
import Section from '../modules/common/components/Section';

function LandingPage() {
  return (
    <div>
      <h1>Misael M.</h1>
      <header className="App-header">
        <NavBar />
      </header>
      <Section title="About" section="about">
        <div>something here 1</div>
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

import React from 'react';
import About from '../modules/sections/components/About';
import Blob from '../modules/interaction/components/Blob';
import Container from '../modules/common/components/Container';

const AboutPage: React.FC = () => {
	return (
		<>
			<Container>
				<About />
        <Blob />
			</Container>
		</>
	);
};

export default AboutPage;

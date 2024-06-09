import React from 'react';
import styles from '../styles/layout.module.css';
import About from '../modules/sections/components/About';
import Blob from '../modules/interaction/components/Blob';

const AboutPage: React.FC = () => {
	return (
		<>
			<div className={styles.container}>
				<About />
        <Blob />
			</div>
		</>
	);
};

export default AboutPage;

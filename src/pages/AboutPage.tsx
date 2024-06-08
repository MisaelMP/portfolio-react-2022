import React, { Fragment } from 'react';
import styles from '../styles/layout.module.css';
import About from '../modules/sections/components/About';
import Blob from '../modules/p5/components/Blob';

const AboutPage: React.FC = () => {
	return (
		<Fragment>
			<div className={styles.container}>
				<About />
        <Blob />
			</div>
		</Fragment>
	);
};

export default AboutPage;

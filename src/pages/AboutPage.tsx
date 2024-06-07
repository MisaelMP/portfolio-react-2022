import React, { Fragment } from 'react';
import styles from '../styles/layout.module.css';
import SwipableCardsSections from '../modules/common/components/SwipableCardsSections';



const AboutPage: React.FC = () => {

	return (
		<Fragment>
			<div className={styles.container}>
				<SwipableCardsSections />
			</div>
		</Fragment>
	);
};

export default AboutPage;
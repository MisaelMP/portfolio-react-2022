import React, { Fragment } from 'react';
import styles from '../styles/layout.module.css';
import Projects from '../modules/sections/components/Projects';

const ProjectsPage: React.FC = () => {
	return (
		<Fragment>
			<div className={`${styles.container}`}>
        <Projects />
			</div>
		</Fragment>
	);
};

export default ProjectsPage;

import Skillset from '../modules/sections/components/Skillset';
import styles from '../styles/layout.module.css';

const SkillsPage: React.FC = () => {
	return (
		<>
			<div className={`${styles.container} ${styles.container2}`}>
				<Skillset />
			</div>
		</>
	);
};

export default SkillsPage;

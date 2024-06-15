import Skillset from '../modules/sections/components/Skillset';
import styles from '../styles/layout.module.css';


const SkillsPage: React.FC = () => {	
		return (
			<>
				<div className={`${styles.container} !bg-[var(--background-orange)]`}>	
					<Skillset />
				</div>
			</>
		);
	};

export default SkillsPage;

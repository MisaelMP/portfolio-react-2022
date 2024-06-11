import ContactForm from '../modules/sections/components/Contact';
import styles from '../styles/layout.module.css';

const ContactPage: React.FC = () => {
	return (
		<>
			<div
				className={`${styles.container} ${styles.container4} overflow-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200`}
			>
				<ContactForm />
			</div>
		</>
	);
};

export default ContactPage;

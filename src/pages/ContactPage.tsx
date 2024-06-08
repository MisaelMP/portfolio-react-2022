import ContactForm from '../modules/sections/components/Contact';
import styles from '../styles/layout.module.css';

const ContactPage: React.FC = () => {
	return (
		<>
			<div className={`${styles.container} ${styles.container4}`}>
				<ContactForm />
			</div>
		</>
	);
};

export default ContactPage;

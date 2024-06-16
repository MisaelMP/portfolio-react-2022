import ContactForm from '../modules/sections/components/Contact';
import styles from '../styles/layout.module.css';

const ContactPage: React.FC = () => {
	return (
		<>
			<div className={`${styles.container} !bg-[var(--background-brown)]`}>
				<ContactForm />
			</div>
		</>
	);
};

export default ContactPage;

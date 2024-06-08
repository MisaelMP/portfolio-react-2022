import { useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [disabled, setDisabled] = useState(false);
	const [alertInfo, setAlertInfo] = useState({
		display: false,
		message: '',
		type: '',
	});

	const toggleAlert = (message: string, type: string) => {
		setAlertInfo({ display: true, message, type });

		setTimeout(() => {
			setAlertInfo({ display: false, message: '', type: '' });
		}, 5000);
	};

	const onSubmit = async (data: FieldValues) => {
		const { name, email, subject, message } = data;
		const serviceId = import.meta.env.VITE_SERVICE_ID;
		const templateId = import.meta.env.VITE_TEMPLATE_ID;
		const publicId = import.meta.env.VITE_PUBLIC_KEY;

		try {
			setDisabled(true);

			const templateParams = {
				name,
				email,
				subject,
				message,
			};

			await emailjs.send(serviceId, templateId, templateParams, publicId);

			toggleAlert('Form submission was successful!', 'success');
		} catch (e) {
			console.error(e);
			toggleAlert('Uh oh. Something went wrong.', 'danger');
		} finally {
			setDisabled(false);
			reset();
		}
	};

	return (
		<div className='ContactForm'>
			<div className='container mx-auto'>
				<div className='max-w-md mx-auto my-8'>
					<div className='text-center'>
						<div className='contactForm'>
							<form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
								<div className='grid grid-cols-1 gap-6'>
									<input
										type='text'
										name='name'
										{...register('name', {
											required: { value: true, message: 'Please enter your name' },
											maxLength: {
												value: 30,
												message: 'Please use 30 characters or less',
											},
										})}
										className='form-input'
										placeholder='Name'
									/>
									{errors.name && <span className='errorMessage'>{errors.name.message}</span>}
									<input
										type='email'
										name='email'
										{...register('email', {
											required: { value: true, message: 'Please enter a valid email address' },
											pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
										})}
										className='form-input'
										placeholder='Email address'
									/>
									{errors.email && <span className='errorMessage'>{errors.email.message}</span>}
									<input
										type='text'
										name='subject'
										{...register('subject', {
											required: { value: true, message: 'Please enter a subject' },
											maxLength: {
												value: 75,
												message: 'Subject cannot exceed 75 characters',
											},
										})}
										className='form-input'
										placeholder='Subject'
									/>
									{errors.subject && <span className='errorMessage'>{errors.subject.message}</span>}
									<textarea
										rows={3}
										name='message'
										{...register('message', {
											required: true,
										})}
										className='form-input'
										placeholder='Message'
									></textarea>
									{errors.message && <span className='errorMessage'>Please enter a message</span>}
									<button
										className='submit-btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
										type='submit'
										disabled={disabled}
									>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{alertInfo.display && (
				<div className={`alert alert-${alertInfo.type} alert-dismissible mt-5`} role='alert'>
					{alertInfo.message}
					<button
						type='button'
						className='btn-close'
						data-bs-dismiss='alert'
						aria-label='Close'
						onClick={() => setAlertInfo({ display: false, message: '', type: '' })}
					></button>
				</div>
			)}
		</div>
	);
};

export default ContactForm;

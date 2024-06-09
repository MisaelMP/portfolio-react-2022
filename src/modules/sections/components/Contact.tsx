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
		<div className="w-clamp text-center">
			<div className='m-4 md:m-8'>
				<form className=' flex flex-col gap-2 lg:gap-4' id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
					<h2 className='text-3xl font-bold'>Get in touch:</h2>
					<div className='flex flex-col gap-1'>
						<input
							className='p-2 md:p-3'
							type='text'
							name='name'
							{...register('name', {
								required: { value: true, message: 'Please enter your name' },
								maxLength: {
									value: 30,
									message: 'Please use 30 characters or less',
								},
							})}
							placeholder='Name'
						/>
						{errors.name && <span className='text-slate-200'>{errors.name.message}</span>}
					</div>
					<div className='flex flex-col md:flex-row gap-2 md:gap-4'>
						<div className='flex flex-col gap-1 flex-1'>
							<input
								className='p-2 md:p-3'
								type='email'
								name='email'
								{...register('email', {
									required: { value: true, message: 'Please enter a valid email address' },
									pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
								})}
								placeholder='Email address'
							/>
							{errors.email && <span className='text-slate-200'>{errors.email.message}</span>}
						</div>
						<div className='flex flex-col gap-1 lg:flex-1'>
							<input
								className='p-2 md:p-3'
								type='text'
								name='subject'
								{...register('subject', {
									required: { value: true, message: 'Please enter a subject' },
									maxLength: {
										value: 75,
										message: 'Subject cannot exceed 75 characters',
									},
								})}
								placeholder='Subject'
							/>
							{errors.subject && <span className='text-slate-200'>{errors.subject.message}</span>}
						</div>
					</div>
					<div className='flex flex-col gap-1'>
						<textarea
							className='p-2 md:p-3'
							rows={3}
							name='message'
							{...register('message', {
								required: true,
							})}
							placeholder='Message'
						></textarea>
						{errors.message && <span className='text-slate-200'>Please enter a message</span>}
					</div>
					<button
						className='bg-[#16161d] hover:opacity-70 text-white font-bold py-4 px-4 rounded mx-auto w-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yello mt-2 lg:mt-4'
						type='submit'
						disabled={disabled}
					>
						Submit
					</button>
				</form>
			</div>

			{alertInfo.display && (
				<div className={`alert alert-${alertInfo.type} text-white mt-5`} role='alert'>
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

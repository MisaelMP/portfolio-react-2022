/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				hind: ['Hind', 'sans-serif'],
				montserrat: ['Montserrat'],
			},
			width: {
				clamp: 'clamp(21rem, 50vw, 125rem)',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};

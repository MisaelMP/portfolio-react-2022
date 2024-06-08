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
				clamp: 'clamp(23.5rem, 100vw, 40rem)',
			},
			screens: {
				landscape: { raw: '(orientation: landscape)' },
        'phone-landscape': {'raw': '(max-width: 375px) and (orientation: landscape)'},
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};

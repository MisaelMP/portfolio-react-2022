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
			keyframes: {
				bounce: {
					'0%, 100%': { transform: 'translateY(-5%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
					'50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
				},
			},
			animation: {
				bounce: 'bounce 1s infinite',
			},
			fill: ['group-hover'],
		},
	},
	plugins: [require('@tailwindcss/forms')],
};

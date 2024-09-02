/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			container: {
				center: true
			},
			colors: {
				primary: '#F57C00',
				secondary: '#6c02be'
			},
			keyframes: {
				moveLeft: {
					from: {
						transform: 'translateX(100%)'
					},
					to: {
						transform: 'translateX(-100%)'
					}
				}
			},

			animation: {
				moveLeft: 'moveLeft 100s linear infinite'
			}
		},
		plugins: []
	}
}

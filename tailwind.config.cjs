const config = {
	content: [
		"./src/**/*.{html,js,svelte,ts}",
		"./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
	],

	theme: {
		// colors: {

		// 	'purple-dark': '#9c89b8',
		// 	'purple-light': '#b8bedd',
		// 	'pink-dark': '#f0a6ca',
		// 	'pink': '#efc3e6',
		// 	'cream': '#f0e6ef'
		// },
		extend: {},
	},

	plugins: [
		require('flowbite/plugin')
	],
	darkMode: 'class',
};

module.exports = config;
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		files: {
			lib: 'src/web/lib',
			routes: 'src/web/routes',
			appTemplate: 'src/web/app.html'
		}
	},
	preprocess: vitePreprocess()
};

export default config;

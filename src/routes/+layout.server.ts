import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	return {
		locale: locals.locale,
	};
};
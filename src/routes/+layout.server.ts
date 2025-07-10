import type { LayoutServerLoad } from './$types';
import { getData } from '$lib/functions/database';
import type { ProgramAll } from '$lib/functions/module';
import type { Training } from '@prisma/client';
// import { VIEW_SERVER } from '$lib/functions/env';

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
	let programs: ProgramAll[] = await getData(process.env.VITE_VIEW_API_KEY, 'program', fetch)
	let training: Training[] = await getData(process.env.VITE_VIEW_API_KEY, 'pd/training', fetch);
	const user = locals.user;
	return { user, programs, training };
};

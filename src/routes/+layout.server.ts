import type { LayoutServerLoad } from './$types';
import { getData } from '$lib/functions/database';
import type { ProgramAll } from '$lib/functions/module';
import type { Training } from '@prisma/client';

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
	let programs: ProgramAll[] = await getData('program', fetch)
	let training: Training[] = await getData('pd/training', fetch);
	const user = locals.user;
	return { user, programs, training };
};

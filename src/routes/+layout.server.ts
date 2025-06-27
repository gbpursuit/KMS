
import type { ServerLoadEvent } from '@sveltejs/kit';


export async function load({ locals }: ServerLoadEvent) {
	const user = locals.user;
	console.log(user);

	return { user };
	// const permissions = user?.role?.permissions.map((p) => p.permission.name) ?? [];

	// return {
	// 	user,
	// 	permissions
	// };
}
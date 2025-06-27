
import type { ServerLoadEvent } from '@sveltejs/kit';

export async function load({ locals }: ServerLoadEvent) {
	const user = locals.user;
	// console.log(user);

	// return { user };
	let permissions = user?.role?.perms.map((p) => p.perms.perm_type) ?? [];

	return {
		user,
		permissions
	};
}
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Account, Role, RolePermission, Permission } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {
		// 	user: Account | null;
		// }
		interface Locals {
			user: (Account & {
				role?: Role & {
					perms: (RolePermission & {
						perms: Permission;
					})[];
				};
			}) | null;
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

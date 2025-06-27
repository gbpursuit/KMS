// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { Account, Role, PermissionOnRole, Permission } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {
		// 	user: Account | null;
		// }
		interface Locals {
			user: (Account & {
				role?: Role & {
					permissions: (PermissionOnRole & {
						permission: Permission;
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

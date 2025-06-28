// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces


interface User {
	id: number,
	acctName: string,
	permission: string[];
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {
		// 	user: Account | null;
		// }
		interface Locals {
			user: User | null;
		}

		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

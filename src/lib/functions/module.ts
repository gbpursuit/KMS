import { writable, type Writable } from 'svelte/store';

interface CONTENT {
	name: string;
	id: string;
	title: string;
	path: string;
}

interface ModuleData {
	path: string;
	items: CONTENT[];
}

export const currentModule: Writable<ModuleData | null> = writable(null);
export const selectedModuleItem: Writable<CONTENT | null> = writable(null);
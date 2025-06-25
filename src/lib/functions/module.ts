import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { writable, type Writable } from 'svelte/store';

export interface CONTENT {
	name: string;
	id: string;
	title: string;
	path: string;
}

export interface ModuleData {
	path: string;
	items: CONTENT[];
}

export interface Program {
	id: number,
	name: string,
	text: string,
	icon: IconDefinition,
	allowed: boolean
}

export const currentModule: Writable<ModuleData | null> = writable(null);
export const selectedModuleItem: Writable<CONTENT | null> = writable(null);
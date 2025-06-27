import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { Program, ProfessionalDevelopment } from '@prisma/client';
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


export interface ProgramPD extends Program {
	pd: ProfessionalDevelopment[];
	_count: { 
		research: number;
		cd: number;
		pd: number;
		extension: number; 
	};
	icon: IconDefinition;
}

export const currentModule: Writable<ModuleData | null> = writable(null);
export const selectedModuleItem: Writable<CONTENT | null> = writable(null);
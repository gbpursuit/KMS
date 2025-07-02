import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { Program, Research, CurriculumDevelopment, ProfessionalDevelopment, Extension } from '@prisma/client';
import { writable, type Writable } from 'svelte/store';

export interface User {
	id: number;
	acctName: string;
	roleId: number;
	permission: string[];
}

export interface Summary {
	name: string;
	count: string;
	icon: IconDefinition;
	label: string;

}

export type ProgramTypes = {
	research: Research;
	cd: CurriculumDevelopment,
	pd: ProfessionalDevelopment;
	extension: Extension;
}

export interface ProgramCards extends Program {
	_count: { [K in keyof ProgramTypes]: number };
	icon: IconDefinition;
}

export type ProgramAll = ProgramCards & {
	[K in keyof ProgramTypes]: ProgramTypes[K][];
};

// Discriminated Union
export type ProgramModule = {
	[K in keyof ProgramTypes]: {
		type: K;
		id: number;
		name: string;
		items: ProgramTypes[K][];
	};
}[keyof ProgramTypes];

// Item Types
export type ProgramItem = ProgramTypes[keyof ProgramTypes];

// export interface ProgramAll extends Program {
// 	research: Research[];
// 	cd: CurriculumDevelopment[];
// 	pd: ProfessionalDevelopment[];
// 	extension: Extension[];
// 	_count: { 
// 		research: number;
// 		cd: number;
// 		pd: number;
// 		extension: number; 
// 	};
// 	icon: IconDefinition;
// }

// export type ProgramModule =
// 	| { type: 'pd'; id: number; name: string; items: ProfessionalDevelopment[] }
// 	| { type: 'cd'; id: number; name: string; items: CurriculumDevelopment[] }
// 	| { type: 'research'; id: number; name: string; items: Research[] }
// 	| { type: 'extension'; id: number; name: string; items: Extension[] };

// export type ProgramItem =
// 	| ProfessionalDevelopment
// 	| CurriculumDevelopment
// 	| Research
// 	| Extension;

export const currentModule: Writable<ProgramModule | null> = writable(null);
export const selectedModuleItem: Writable<ProgramItem | null> = writable(null);
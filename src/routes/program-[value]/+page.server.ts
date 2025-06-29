import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getData } from '$lib/functions/database';
import type { ProgramAll, ProgramModule, ProgramItem } from '$lib/functions/module';

export const load: PageServerLoad = async ({ fetch, params, url, parent }) => {
    let { user } = await parent();
    let programId = params.value;

    // if (!user) {
    //     throw redirect(302, `/auth`);
    // }

    let itemId = url.searchParams.get('itemId');
    let rawPrograms: ProgramAll[] = await getData('program', fetch);
    let selectedProgram = rawPrograms.find((p) => p.id.toString() === programId);
    if (!selectedProgram) {
        throw error(404, 'Program Not Found');
    }

    let program: ProgramModule;

    switch (selectedProgram.name) {
        case 'Professional Development':
            program = {
                type: 'pd',
                id: selectedProgram.id,
                name: selectedProgram.name,
                items: selectedProgram.pd
            };
            break;
        case 'Curriculum Development':
            program = {
                type: 'cd',
                id: selectedProgram.id,
                name: selectedProgram.name,
                items: selectedProgram.cd
            };
            break;
        case 'Research':
            program = {
                type: 'research',
                id: selectedProgram.id,
                name: selectedProgram.name,
                items: selectedProgram.research
            };
            break;
        case 'Extension':
            program = {
                type: 'extension',
                id: selectedProgram.id,
                name: selectedProgram.name,
                items: selectedProgram.extension
            };
            break;
        default:
            throw error(500, 'Unrecognized program name');
    }

    let selectedItem: ProgramItem | null = null;

    if (itemId) {
        switch (program.type) {
            case 'pd':
                selectedItem = program.items.find((i) => i.id.toString() === itemId) ?? null;
                break;
            case 'cd':
                selectedItem = program.items.find((i) => i.id.toString() === itemId) ?? null;
                break;
            case 'research':
                selectedItem = program.items.find((i) => i.id.toString() === itemId) ?? null;
                break;
            case 'extension':
                selectedItem = program.items.find((i) => i.id.toString() === itemId) ?? null;
                break;
        }
    }

    return {
        programId,
        program,
        selectedItem
    };
};
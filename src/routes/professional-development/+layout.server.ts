import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getData } from '$lib/functions/database';
import { capitalizeWords } from '$lib/functions/function'
import type { ProgramAll, ProgramModule, ProgramItem } from '$lib/functions/module';
import type { Training } from '@prisma/client';

export const load: LayoutServerLoad = async ({ fetch, params, url, parent }) => {
    let { user, training } = await parent();

    if (!user) {
        throw redirect(302, `/auth`);
    }
    let segments = url.pathname.split('/').filter(Boolean);
    let pathName = segments[0].replace('-',' ').toLowerCase(); 

    let itemId: string;
    if (segments.length > 1 ) {
        itemId = segments[1].split('-')[1];
    }
    // let itemId = segments[1].split('-')[1];
    let rawPrograms: ProgramAll[] = await getData('program', fetch);

    let selectedProgram = rawPrograms.find((p) => p.name.toLowerCase() === pathName);
    if (!selectedProgram) {
        throw error(404, 'Program Not Found');
    }

    if(user && user.roleId === 3) {
        throw redirect(302, '/manage');
    }
    
    let pd: ProgramModule;
    
    switch (pathName) {
        case 'professional development':
            pd = {
                type: 'pd',
                id: selectedProgram.id,
                name: selectedProgram.name,
                items: selectedProgram.pd
            };
            break;
        default:
            throw error(500, 'Unrecognized program name');
    }

    let selectedItem: ProgramItem | null = null;

    // try {
    //     let temp: ProgramItem | undefined = pd.items.find((i) => i.id.toString() === itemId)
    //     if(!temp) throw error(404, 'Module Not Found');
    //     else selectedItem = temp
    // } catch (err) {
    //     console.log(err)
    //     return;
    // }

    // if (itemId) {
    switch (pd.type) {
        case 'pd':
            selectedItem = pd.items.find((i) => i.id.toString() === itemId) ?? null;
            break;
        default:
            selectedItem = null;
            break;
    }
    // }


    return {
        programId: 3,
        name: capitalizeWords(pathName),
        pd,
        selectedItem,
        training
    };
};
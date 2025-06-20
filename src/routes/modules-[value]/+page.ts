import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import modules from "$lib/data/modules.json";

interface CONTENT {
    name: string;

}

interface MODULE {
    [key: string]: { 
        title: string;
        items: CONTENT[];
    };
}

const moduleContent: MODULE = modules;

export const load: PageLoad = ({ params }) => {
    let content = moduleContent[params.value];

	if (!content) {
		throw error(404, 'Module not found');
	}

    return content
}
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import modules from "$lib/data/modules.json";

// Module Type Stricting
interface CONTENT {
    id: string;
    name: string;
    title: string;
    path: string;

}
interface MODULE {
    [key: string]: { 
        path: string;
        items: CONTENT[];
    };
}

const moduleContent: MODULE = modules;

export const load: PageLoad = ({ params, url }) => {
    const moduleId = params.value;
    const itemId = url.searchParams.get('itemId');

    const module = moduleContent[moduleId];

	if (!module) {
		throw error(404, 'Module not found');
	}

    const selectedItem = module.items.find(i => i.id === itemId) ?? null;

    return {
        module,
        selectedItem
    }
}
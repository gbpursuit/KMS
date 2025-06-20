import type { PageLoad } from './$types';
import training from "$lib/data/training.json"; 

interface TRAIN {
    [key: string]: {
        path:string;
        title:string;
    };
}

const trainContent: TRAIN = training;

export const load: PageLoad = ({ params }) => {
    let content = trainContent[params.module];  // this could be the id row in database

    if (!content) {
        throw error(404, 'Module not found');
    }

    return content;                             
}
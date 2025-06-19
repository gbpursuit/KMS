import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import value from "$lib/data/value.json";

interface valueString {
    [key: string]: { 
        title: string;
    };
}

const v: valueString = value;

export const load: PageLoad = ({ params }) => {
    let titleContent = v[params.value];
    return titleContent
}
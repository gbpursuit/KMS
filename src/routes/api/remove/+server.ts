import type { RequestHandler } from '@sveltejs/kit';
import { rm } from 'fs/promises';
import { data } from '$lib/functions/prisma'; 
import path from 'path';

// export const POST: RequestHandler = async ({ request }) => {
//     let form = await request.formData();
//     let file = form.get('file') as File | null;
//     let title = form.get('title')?.toString() ?? 'uncategorized'; // if title name is undefined, folder is named uncategorized -- for now title muna category

//     if (!file || typeof file === 'string') {
//           return data.json({ path: null });
//     }

//     let folderPath = path.join('static', 'uploads', title);
//     let fileName = `${file.name}`;         
//     let filePath = path.join(folderPath, fileName);
//     let result = await rm(filePath);                        // save image to filePath

//     return data.json({ result });                       // return PATH file to store in database

// }


export const POST: RequestHandler = async ({ request }) => {
    const { filePath, title = 'uncategorized' } = await request.json();

    if (!filePath || typeof filePath !== 'string') {
        return data.json({ path: null });
    }

    const fileName = filePath.split('/').pop();
    if (!fileName) {
        return data.json({ path: null });
    }
    
    const folderPath = path.join('static', 'uploads', title);
    const fullPath = path.join(folderPath, fileName);

    try {
        await rm(fullPath);
        return data.json({ result: 'File deleted' });
    } catch (err) {
        return data.json({ error: 'Failed to delete file' }, { status: 500 });
    }
};
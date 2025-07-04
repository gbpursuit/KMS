import type { RequestHandler } from '@sveltejs/kit';
import { mkdir, writeFile } from 'fs/promises';
import { data } from '$lib/functions/prisma'; 
import path from 'path';

export const POST: RequestHandler = async ({ request }) => {
    let form = await request.formData();
    let file = form.get('file') as File | null;
    let leader = form.get('leader')?.toString() ?? 'uncategorized'; // if leader name is undefined, folder is named uncategorized -- for now leader muna category

    if (!file || typeof file === 'string') {
		return data.json({ path: null });
    }

    let buffer = Buffer.from(await file.arrayBuffer());    // file binary data to be saved

    let folderPath = path.join('static', 'uploads', leader);
    await mkdir(folderPath, { recursive: true })            // automatic creation of folders if not existing

    let fileName = `${file.name}`;         
    let filePath = path.join(folderPath, fileName);
    await writeFile(filePath, buffer);                      // save image to filePath

    const PATH = `/uploads/${leader}/${fileName}`;
    return data.json({ path: PATH });                       // return PATH file to store in database

}
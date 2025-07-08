import type { RequestHandler } from '@sveltejs/kit';
import { mkdir, writeFile } from 'fs/promises';
import { data } from '$lib/functions/prisma'; 
import { getFileType } from '$lib/functions/media';
import path from 'path';

export const POST: RequestHandler = async ({ request }) => {
    let form = await request.formData();
    let file = form.get('file') as File | null;
    let title = form.get('title')?.toString() ?? 'uncategorized'; // if title name is undefined, folder is named uncategorized -- for now title muna category

    if (!file || typeof file === 'string') {
		  return data.json({ path: null });
    }

    let { type, maxSizeMB } = getFileType(file.name);

    if (file.size > maxSizeMB * 1024 * 1024) {
      return data.json({ error: `File too large. Max ${maxSizeMB}MB for ${type}` }, { status: 413 });
    }

    if (type === 'other') {
      return data.json({ error: 'Unsupported file type' }, { status: 415 });
    }

    let buffer = Buffer.from(await file.arrayBuffer());    // file binary data to be saved

    let folderPath = path.join('static', 'uploads', title);
    await mkdir(folderPath, { recursive: true })            // automatic creation of folders if not existing

    let fileName = `${file.name}`;         
    let filePath = path.join(folderPath, fileName);
    await writeFile(filePath, buffer);                      // save image to filePath

    const PATH = `/uploads/${title}/${fileName}`;
    return data.json({ path: PATH });                       // return PATH file to store in database

}
// import { mkdir, writeFile } from 'fs/promises';
// import path from 'path';

// export async function uploadImage(image: File, category: string) {
//     if (!image || typeof image === 'string') {
//         return new Response('No file uploaded', {status: 400});
//     }

//     let buffer = Buffer.from(await image.arrayBuffer());

//     let folderPath = path.join('static', 'uploads', category);
//     await mkdir(folderPath, { recursive: true }) // automatic creation of folders if not existing

//     let fileName = `${image.name}`;
//     let filePath = path.join(folderPath, fileName);
//     await writeFile(filePath, buffer);

//     const PATH = `/uploads/${category}/${fileName}`;

//     return PATH;
//     // return new Response(JSON.stringify({ path: URL}), {
//     //     status: 200, 
//     //     headers: {'Content-Type': 'application/json'}}
//     // );


// }

//     if(image) {
//         const PATH = await uploadImage(data.imageUrl, data.leader);
//         data.imageURL = PATH; // replace image File with Path
//     }
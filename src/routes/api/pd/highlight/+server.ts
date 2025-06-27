// GET AND POST ALL HIGHLIGHT ITEMS
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, POST } = createHandlers('highlight', {
    logPrefix: 'pd/highlight',
    errorHandle: 'Entire Highlight',
    useMany: true
})

// export const GET: RequestHandler = async () => {
//     try {
//         let highlights = await prisma.highlight.findMany({ 
//             orderBy: { 
//                 id: 'asc' 
//             } 
//         });
//         return json(highlights)
//     } catch (err) {
//         console.error('GET /api/highlight error:', err);
//         return json({ error: 'Failed to retrieve all highlights' }, {status : 500});
//     }
// 	// const highlights = await prisma.highlight.findMany({ orderBy: { id: 'asc' } });
// 	// return json(highlights);
// };

// export const POST: RequestHandler = async ({ request }) => {
//     try {
//         let data = await request.json();
//         if(!data) {
//             return json({ error: 'POST: Highlight Data is required' }, { status: 400});
//         }

//         let created = await prisma.highlight.create({
//             data: {
//                 title: data.title,
//                 text: data.text,
//                 imageUrl: data.imageUrl,
//                 pdfURL: data.pdfURL,
//                 vidURL: data.vidURL,
//                 pdId: data.pdId,
//             },
//         });
//         return json(created);

//     } catch (err) {
//         console.error('POST /api/highlight error:', err);
//         return json({ error: 'Failed to add highlight' }, {status : 500});
//     }
// };

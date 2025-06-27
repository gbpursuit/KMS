// GET AND POST ALL ACCOUNTS
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, POST } = createHandlers('account', {
    include: {
        role: {
            include: {
                perms: {
                    include: {
                        perms: true 
                    }
                }
            }
        }
    },
    logPrefix: 'account',
    useMany: true
})

// export const GET: RequestHandler = async() => {
//     try {
//         let roles = await prisma.account.findMany({
//             orderBy: {
//                 id: 'asc'
//             },
//             include: {
//                 role: {
//                     include: {
//                         perms: {
//                             include: {
//                                 perms: true 
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//         return json(roles);
//     } catch (err) {
//         console.error('GET /api/account error:', err);
//         return json({ error: 'Failed to retrieve all accounts' }, {status : 500});
//     }
// }

// export const POST: RequestHandler = async ({ request }) => {
//     try {
//         let data = await request.json();
//         if(!data) {
//             return json({ error: 'POST: Account Data is required' }, { status: 400});
//         }

//         let role = await prisma.account.create({
//             data: data 
//         })

//         return json(role)
//     } catch (err) {
//         console.error('POST /api/account error:', err);
//         return json({ error: 'Failed to add account' }, {status : 500});
//     }
// }
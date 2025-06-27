// GET, UPDATE, DELETE A SPECIFIC ACCOUNTS
import { createHandlers } from '$lib/functions/specificHandle';

// export const PUT: RequestHandler = async ({ params, request }) => {
//     try {
//         let id = Number(params.id);
//         if(isNaN(id)) {
//             return json({ error: 'PUT: Invalid Account ID' }, { status: 400 });
//         }

//         let data = await request.json();

//         if(!data) {
//             return json({ error: 'PUT: Role Data is required' }, { status: 400});
//         }
        
//         let updated = await prisma.account.update({
//             where: { id },
//             data: data
//         });
//         return json(updated);   
//     } catch(err) {
//         console.error('GET /api/account/[id] error:', err);
//         return json({ error: 'Failed to update account' }, {status : 500});
//     }
// }

export const { GET, PUT, DELETE } = createHandlers('account', {
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
    logPrefix: 'account'
})
// POST AND DELETE ALL PD - PERSONNEL RELATIONSHIP
import type { RequestHandler } from '@sveltejs/kit';
import { data } from '$lib/functions/prisma'; 

export const POST: RequestHandler = async({ request }) => {
    try {
        let item = await request.json();
        if(!item) {
            return data.json({ error: 'Personnel and PD ID is required. Add Failed.'}, {status:400});
        }

        let personnelonpd = await data.PRISMA.personnelOnPd.create({
            data: item
        })
        return data.json(personnelonpd);
    } catch (err) {
        console.error('POST /api/pd/personnelonpd error: ', err);
        return data.json({ error: 'Failed to retrieve all personnelonpd'}, { status: 500 });
    }
}

export const DELETE: RequestHandler = async({ request }) => {
    try {
        let item = await request.json();
        if(!item) {
            return data.json({ error: 'Personnel and PD ID is required. Delete Failed.'}, {status:400});
        }

        let personnelonpd = await data.PRISMA.personnelOnPd.delete({
            where: {
                pdId_personnelId: { pdId: item.pdId, personnelId: item.personnelId}
            }
        })
        return data.json(personnelonpd);
    } catch (err) {
        console.error('DELETE /api/pd/personnelonpd error: ', err);
        return data.json({ error: 'Failed to retrieve all personnelonpd'}, { status: 500 });
    }
}
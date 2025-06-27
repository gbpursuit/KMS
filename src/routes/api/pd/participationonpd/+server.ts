// POST AND DELETE ALL PD - PARTICIPANT RELATIONSHIP
import type { RequestHandler } from '@sveltejs/kit';
import { data } from '$lib/functions/prisma';

export const POST: RequestHandler = async({ request }) => {
    try {
        let item = await request.json();
        if(!item) {
            return data.json({ error: 'POST: Participant and PD ID is required'}, {status:400});
        }

        let participantonpd = await data.PRISMA.participantOnPd.create({
            data: item
        })
        return data.json(participantonpd);
    } catch (err) {
        console.error('POST /api/pd/participantonpd error: ', err);
        return data.json({ error: 'Failed to retrieve all participantonpd'}, { status: 500 });
    }
}

export const DELETE: RequestHandler = async({ request }) => {
    try {
        let item = await request.json();
        if(!item) {
            return data.json({ error: 'DELETE: Participant and PD ID is required'}, {status:400});
        }

        let participantonpd = await data.PRISMA.participantOnPd.delete({
            where: {
                pdId_participantId: { pdId: item.pdId, participantId: item.participantId}
            }
        })
        return data.json(participantonpd);
    } catch (err) {
        console.error('DELETE /api/pd/participantonpd error: ', err);
        return data.json({ error: 'Failed to retrieve all participantonpd'}, { status: 500 });
    }
}
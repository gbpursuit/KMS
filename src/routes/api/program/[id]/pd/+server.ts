// GET AND POST ALL PDs UNDER A SPECIFIC PROGRAM
import type { RequestHandler } from '@sveltejs/kit';
import { data } from '$lib/functions/prisma'; 

export const GET: RequestHandler = async ({ params }) => {
    let programId = Number(params.id);
    if(isNaN(programId)) {
        return data.json({ error: 'Invalid program ID' }, { status: 400 });
    }

    try {
        let program = await data.PRISMA.professionalDevelopment.findMany({
            where: {programId: programId},
            orderBy: {
                id: 'asc'
            },
            include: {
                // pd -> ProfessionalDevelopment[]
				training: true,
				program: true,
				highlight: true,
				participantonpd: true,
				personnelonpd: true
            }
        });
        if(!program) return data.json({ error: `Program ${programId} not found`}, { status: 404 });

        return data.json(program);

    } catch (err) {
        console.error('GET /api/program/[id]/pd error: ', err);
        return data.json({ error: 'Failed to retrieve program pd '}, { status: 500 })
    }
}

export const POST: RequestHandler = async ({ params, request }) => {
    return data.json({})
}

export const DELETE: RequestHandler = async ({ params, request }) => {
    return data.json({})
}
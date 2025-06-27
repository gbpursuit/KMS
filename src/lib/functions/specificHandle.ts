import type { RequestHandler } from '@sveltejs/kit';
import { data } from '$lib/functions/prisma'; 
import { error } from '@sveltejs/kit';

type ModelName = keyof typeof data.PRISMA;

export function createHandlers(
    modelName: ModelName,
    options?: {
        include?: object;
        logPrefix?: string;
        useMany?: boolean;
    }
) {
    let { include = undefined, logPrefix = modelName as string, useMany = false } = options || {};

    const GET: RequestHandler = async ({ params }) => {
        let item: any;
        if (useMany) {
            try {
                item = await (data.PRISMA[modelName] as any).findMany({
                    orderBy: {
                        id: 'asc'
                    },
                    include
                });
                if (item.length === 0) {
                    throw error(404, `GET (many): ${logPrefix} is empty`);
                }
            } catch(err: any) {
                if (err?.status) throw err;

                console.error(`GET /api/${logPrefix} error:`, err);
                throw error(500, `Failed to retrieve all ${logPrefix}s`);
            }
        } else {
            let id = Number(params.id);
            if (isNaN(id)) {
                throw error(400, `GET: Invalid ${logPrefix} ID`);
            }
            try {
                item = await (data.PRISMA[modelName] as any).findUnique({
                    where: { id: id },
                    include
                });

                if (!item) {
                    throw error(404, `GET (unique): ${logPrefix} not found`);
                }

            } catch(err: any) {
                if (err?.status) throw err;

                console.error(`GET /api/${logPrefix}/[id] error:`, err);
                throw error(500, `Failed to retrieve ${logPrefix}`);
            }
        }
        return data.json(item);
    };

    const POST: RequestHandler = async ({ request }) => {
        try {
            let data = await request.json();
            if(!data) {
                throw error(400, `POST: ${logPrefix} data is missing`)
            }

            let item = await (data.PRISMA[modelName] as any).create({
                data: data
            });
            return data.json(item);
        } catch (err:any) {
            if(err?.status) throw err;

            console.error(`POST /api/${logPrefix} error:`, err);
            throw error(500, `Failed to add ${logPrefix}`);
        }
    };

    const PUT: RequestHandler = async ({ params, request }) => {
        let id = Number(params.id);
        if(isNaN(id)) {
            throw error(400, `PUT: Invalid ${logPrefix} ID`);
        }
        try {
            let data = await request.json();
            if(!data) {
                throw error(400, `PUT: ${logPrefix} data is missing`);
            }

            let item = await (data.PRISMA[modelName] as any).update({
                where: {id},
                data: data
            });

            return data.json(item);
        } catch (err: any) {
            if(err?.status) throw err;

            console.error(`PUT /api/${logPrefix}/[id] error:`, err);
            throw error(500, `Failed to update ${logPrefix}`);
        }   
    };

    const DELETE: RequestHandler = async ({ params }) => {
        let id = Number(params.id);
        if(isNaN(id)) {
            throw error(400, `DELETE: Invalid ${logPrefix} ID`);
        }
        try {
            let deleted = await (data.PRISMA[modelName] as any).delete({
                where: { id }
            })

            return data.json(deleted);
        } catch(err: any) {
            if(err?.status) throw err;
            console.error(`DELETE /api/${logPrefix}/[id] error:`, err);
            return data.json({ error: `Failed to delete ${logPrefix}` }, { status: 500 });
        }
    };

    return { GET, POST, PUT, DELETE };
}
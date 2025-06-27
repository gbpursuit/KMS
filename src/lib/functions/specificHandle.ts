import type { RequestHandler } from '@sveltejs/kit';
import { data } from '$lib/functions/prisma'; 
import { error } from '@sveltejs/kit';

type ModelName = keyof typeof data.PRISMA;

export function createHandlers(
    modelName: ModelName,
    options?: {
        include?: object;
        logPrefix?: string;
        errorHandle?: string;
        useMany?: boolean;
    }
) {
    let { include = undefined, logPrefix = modelName as string, errorHandle = modelName as string, useMany = false } = options || {};

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
                    throw error(404, `${errorHandle} is empty`);
                }
            } catch(err: any) {
                console.error(`GET /api/${logPrefix} error:`, err);
                if (err?.status) throw err;
                throw error(500, err?.message || `Failed to retrieve ${logPrefix}s`);
            }
        } else {
            let id = Number(params.id);
            if (isNaN(id)) {
                throw error(400, `GET: Invalid ${errorHandle} ID`);
            }
            try {
                item = await (data.PRISMA[modelName] as any).findUnique({
                    where: { id: id },
                    include
                });

                if (!item) {
                    throw error(404, `${errorHandle} not found`);
                }

            } catch(err: any) {
                console.error(`GET /api/${logPrefix}/[id] error:`, err);
                if (err?.status) throw err;
                throw error(500, err?.message || `Failed to retrieve ${logPrefix}`);
            }
        }
        return data.json(item);
    };

    const POST: RequestHandler = async ({ request }) => {
        try {
            let item = await request.json();
            if(!item) {
                throw error(400, `${errorHandle} data is missing`)
            }

            let added = await (data.PRISMA[modelName] as any).create({
                data: item
            });
            return data.json(added);
        } catch (err:any) {
            console.error(`POST /api/${logPrefix} error:`, err);
            if (err?.status) throw err;
            throw error(500, err?.message || `Failed to add ${logPrefix}`);
        }
    };

    const PUT: RequestHandler = async ({ params, request }) => {
        let id = Number(params.id);
        if(isNaN(id)) {
            throw error(400, `Invalid ${errorHandle} ID. Update Failed.`);
        }
        try {
            let item = await request.json();
            if(!item) {
                throw error(400, `PUT: ${logPrefix} data is missing`);
            }

            let updated = await (data.PRISMA[modelName] as any).update({
                where: {id},
                data: item
            });

            return data.json(updated);
        } catch (err: any) {
            console.error(`PUT /api/${logPrefix}/[id] error:`, err);
            if (err?.status) throw err;
            throw error(500, err?.message || `Failed to update ${logPrefix}`);
        }   
    };

    const DELETE: RequestHandler = async ({ params }) => {
        let id = Number(params.id);
        if(isNaN(id)) {
            throw error(400, `Invalid ${errorHandle} ID. Delete Failed.`);
        }
        try {
            let deleted = await (data.PRISMA[modelName] as any).delete({
                where: { id }
            })

            return data.json(deleted);
        } catch(err: any) {
            console.error(`DELETE /api/${logPrefix}/[id] error:`, err);
            if (err?.status) throw err;
            throw error(500, err?.message || `Failed to delete ${logPrefix}`);
        }
    };

    return { GET, POST, PUT, DELETE };
}
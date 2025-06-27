// PERMISSION PER ROLE
import type { RequestHandler } from '@sveltejs/kit';
import { data } from '$lib/functions/prisma'; 

//not validated if working yet
export const GET: RequestHandler = async ({ params }) => {
    let roleId = Number(params.id);
    if(isNaN(roleId)) {
        return data.json({ error: 'Invalid role ID' }, { status: 400 });
    }

    try {
        let role = await data.PRISMA.role.findUnique({
            where: {id: roleId},
            include: {
                // perms -> RolePermission[]
                perms: {
                    include: {
                        // perms -> RolePermission[] -> Permission
                        // show (true)
                        perms: true
                    }
                }
            }
        });
        if(!role) return data.json({ error: `Role ${roleId} not found`}, { status: 404 });

        let permission = role.perms.map((rp: { perms: any; }) => rp.perms); // di ko alam bakit nagloloko if walang perms: any
        return data.json(permission);
    } catch (err) {
        console.error('GET /api/role/[id]/permissions error: ', err);
        return data.json({ error: 'Failed to retrieve role permissions '}, { status: 500 })
    }
}

export const POST: RequestHandler = async ({ params, request }) => {
    let roleId = Number(params.id);
    if(isNaN(roleId)){
        return data.json({ error: 'POST: Invalid Role ID' }, { status: 400 });
    }

    let item = await request.json();
    if (!item) {
        return data.json({ error: `POST: Role Permission Data is required` }, { status: 400 });
    }

    try {
        let assigned = await data.PRISMA.rolePermission.create({
            data: { roleId, permId: item.permId }
        });
        return data.json(assigned);
    } catch (err) {
        console.error('POST /api/role/[id]/permissions error: ', err);
        return data.json({ error: 'Failed to add role permissions '}, { status: 500 })
    }

}

export const DELETE: RequestHandler = async({ params, request }) => {
    let roleId = Number(params.id);
    if(isNaN(roleId)) {
        return data.json({ error: 'DELETE: Invalid Role ID' }, { status: 400 });
    }

    let item = await request.json();
    if(!item) {
        return data.json({ error: 'DELETE: Role Permission Data is required ' }, { status: 400 });
    }

    try {
        let deleted = await data.PRISMA.rolePermission.delete({
            where: {
                roleId_permId: {
                    roleId,
                    permId: item.permId
                }
            }
        });

        return data.json(deleted);
    } catch (err) {
        console.error('DELETE /api/role/[id]/permissions error: ', err);
        return data.json({ error: 'Failed to delete role permissions '}, { status: 500 })
    }
}
import { loginUser, createSession } from '$lib/functions/auth';
import type { RequestHandler } from '@sveltejs/kit';
import { data } from '$lib/functions/prisma';

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        let item = await request.json();
        let user = await loginUser(item);

        createSession(user.id, cookies)
        return data.json({ success: true, userId: user.id });
    } catch (err) {
        console.error(err);
        if (err instanceof Error) {
            return data.json({ error: err.message }, { status: 401 });
        }
        return data.json({ error: 'Unknown error' }, { status: 500 });
    }
}
import { registerUser, createSession } from '$lib/functions/auth';
import type { RequestHandler } from '@sveltejs/kit';
import { data } from '$lib/functions/prisma';

export const POST: RequestHandler = async ({ request, cookies }) => {
    try {
        let item = await request.json();
        let user = await registerUser(item);

        createSession(user.result.id, cookies)
        return data.json({ success: true, userId: user.result.id });
    } catch (err) {
        if (err instanceof Error) {
            return data.json({ error: err.message }, { status: 400 });
        }
        return data.json({ error: 'Unknown error' }, { status: 500 });
    }
}
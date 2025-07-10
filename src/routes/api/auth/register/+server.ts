import { registerUser, createSession } from '$lib/functions/auth';
import type { RequestHandler } from '@sveltejs/kit';
import { data } from '$lib/functions/prisma';
import { error } from '@sveltejs/kit';
import { compare } from 'bcrypt';
import { hashedKey } from '$lib/functions/auth';

let ORIGTOKEN = await hashedKey(process.env.VITE_VIEW_API_KEY);

export const POST: RequestHandler = async ({ request, cookies, url }) => {
    try {

        let tokenKey = url.searchParams.get('token');   
        if (!tokenKey) throw error(403, 'Forbidden');
        
        let isValid = await compare(tokenKey, ORIGTOKEN);
        if (!isValid) throw error(403, 'Forbidden');

        let item = await request.json();
        let user = await registerUser(item);

        await createSession(user.id, cookies)
        return data.json({ success: true, userId: user.id });
    } catch (err) {
        if (err instanceof Error) {
            return data.json({ error: err.message }, { status: 400 });
        }
        return data.json({ error: 'Unknown error' }, { status: 500 });
    }
}
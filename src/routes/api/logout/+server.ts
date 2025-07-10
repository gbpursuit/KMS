import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { compare } from 'bcrypt';
import { hashedKey } from '$lib/functions/auth';

let ORIGTOKEN = await hashedKey(process.env.VITE_VIEW_API_KEY);

export const GET: RequestHandler = async ({ cookies, url }) => {
    let tokenKey = url.searchParams.get('token');   
    if (!tokenKey) throw error(403, 'Forbidden');
    
    let isValid = await compare(tokenKey, ORIGTOKEN);
    if (!isValid) throw error(403, 'Forbidden');

    cookies.delete('session', {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    });
    // cookies.set('session', '', {
    //     path: '/',
    //     expires: new Date(0)
    // });
    throw redirect(302, '/');
}
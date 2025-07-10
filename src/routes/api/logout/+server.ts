import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = ({ cookies }) => {
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
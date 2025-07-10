import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = ({ cookies }) => {
    cookies.delete('session', {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    });
    throw redirect(302, '/');
}
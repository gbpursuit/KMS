import { compare, hash } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import type { Cookies } from '@sveltejs/kit';
import { getData, addData } from '$lib/functions/database';
import { data } from '$lib/functions/prisma';

const SECRET = 'super-secret'; // replace with env var
const { sign, verify } = jsonwebtoken;

export async function registerUser(item: Record<string, any>) {
    let hashed = await hash(item.password, 10);
    try {
        let existing = await data.PRISMA.account.findUnique({
            where: {
                username: item.username
            }
        })

        if(existing) throw new Error('User already exists');

        // return existing;
        // let user = await addData('account', {
        //     id: data.id,
        //     username: data.username,
        //     firstName: data.firstName,
        //     lastName: data.lastName,
        //     acctName: data.acctName,
        //     password: hashed,
        //     roleId: 1
        // });

        // return user;
    } catch (err) {
        throw new Error('Registration failed');
    }
}

export async function loginUser(item: Record<string, any>) {
    try {
        // let user = await getData(`account/${data.id}`);
        let user = await data.PRISMA.account.findUnique({
            where: {
                username: item.username
            }
        })

        if(!user) throw new Error('User not found');
        let isValidate = await compare(item.password, user.password);

        if(!isValidate) throw new Error('Invalid Password');

        return user;
    } catch (err) {
        if(err) throw err;
        
        throw new Error('Login failed');
    }
}

export function createSession(userId: number, cookies: Cookies) {
    let duration = 7200; // 2 hours
    let token = sign({ userId }, SECRET, {expiresIn: duration});
    cookies.set('session', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: duration
    })
}

export async function getUserFromCookie(cookies: Cookies) {
    let token = cookies.get('session');
    if(!token) return null;

    try {
        let decoded = verify(token, SECRET) as { userId: number };
        let user = await getData(`account/${decoded.userId}`);

        return user;
    } catch (err) {
        return null;
    }
}


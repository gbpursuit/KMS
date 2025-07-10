import { compare, hash } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { type Cookies, error } from '@sveltejs/kit';
import { data } from '$lib/functions/prisma';

const SECRET = await hashedKey(process.env.SECRET_KEY);
const { sign, verify } = jsonwebtoken;

export async function registerUser(item: Record<string, any>) {
    try {
        if (item.password !== item.confirmPassword) throw new Error ('Passwords do not match');

        let hashed = await hash(item.password, 10);
        let existing = await data.PRISMA.account.findUnique({
            where: {
                username: item.username
            }
        })
        
        if(existing) throw new Error('Username is already taken');

        let acctName = `${item.firstName.trim()} ${item.lastName.trim()}`.trim()
        let user = await data.PRISMA.account.create({
            data: {
				username: item.username,
				firstName: item.firstName,
				lastName: item.lastName,
				acctName: acctName,
				password: hashed,
				roleId: 2
            }
        });
        
        return user;
    } catch (err) {
		console.error('Registration failed:', err);
		throw err;
    }
}

export async function loginUser(item: Record<string, any>) {
    try {
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
		console.error('Login failed:', err);
		throw err;
    }
}

export async function hashedKey(item: string | undefined) {
    try {
        if(!item || !process.env.SALT_ROUNDS) throw new Error('Invalid Request');
        return await hash(item, parseInt(process.env.SALT_ROUNDS));

    } catch(err) {  
        console.error('Error:', err);
        throw err;
    }
}

export async function createSession(userId: number, cookies: Cookies) {

    try {
        let duration = 7200; // 2 hours

        if(!SECRET) throw error(400, 'No SECRET KEY');
        let token = sign({ userId }, SECRET, {expiresIn: duration});
        cookies.set('session', token, {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: duration
        })
    } catch (err) {
        console.error('Error', err);
        throw err;
    }
}

export async function getUserFromCookie(cookies: Cookies) {
    let token = cookies.get('session');
    if(!token) return null;

    try {
        if(!SECRET) throw error(400, 'No SECRET KEY');
        let decoded = verify(token, SECRET) as { userId: number };
        let userInitial = await data.PRISMA.account.findUnique({
            where: { id: decoded.userId },
			include: {
				role: {
					include: {
						perms: { include: { perms: true } }
					}
				}
			}
        })

        if(!userInitial) throw new Error('User not found');

        let user = {
            id: userInitial.id,
            acctName: userInitial.acctName,
            roleId: userInitial.roleId,
            permission: userInitial?.role?.perms.map((p) => p.perms.perm_type)
        }

        return user;
    } catch (err) {
        return null;
    }
}
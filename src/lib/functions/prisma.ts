// import { PrismaClient } from '@prisma/client';
// import { json } from '@sveltejs/kit';

// const prisma = new PrismaClient();
// // export default prisma;

// export const data = { prisma, json };

import { PrismaClient } from '@prisma/client';
import { json } from '@sveltejs/kit';

const GLOBALPRISMA = globalThis as unknown as { prisma?: PrismaClient };
const PRISMA = GLOBALPRISMA.prisma ?? new PrismaClient();

if (process.env.NODE_ENV === 'development') {
	GLOBALPRISMA.prisma = PRISMA;
}

export const data: {
	PRISMA: PrismaClient;
	json: typeof json;
} = { PRISMA, json };
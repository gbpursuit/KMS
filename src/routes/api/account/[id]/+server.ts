// GET, UPDATE, DELETE A SPECIFIC ACCOUNTS
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, PUT, DELETE } = createHandlers('account', {
    include: {
        role: {
            include: {
                perms: {
                    include: {
                        perms: true 
                    }
                }
            }
        }
    },
    logPrefix: 'account',
    errorHandle: 'Account'
})
// GET AND POST ALL TRAINING ITEMS
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, POST } = createHandlers('training', {
    logPrefix: 'pd/training',
    errorHandle: 'Entire Training',
    useMany: true
})
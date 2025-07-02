// GET AND POST ALL PDs 
import { createHandlers } from '$lib/functions/specificHandle';

export const { GET, POST } = createHandlers('professionalDevelopment', {
    logPrefix: 'pd',
    errorHandle: 'Entire Professional Development',
    useMany: true
})

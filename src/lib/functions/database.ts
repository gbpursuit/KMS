
/* PROGRAM DATA */
// GET data
import { error } from '@sveltejs/kit';
import type { TabInterface } from '$lib/functions/tab-content'

export async function getData(tokenKey: string | undefined, type: string, fetchFn?: typeof fetch, id?: number | string) {
    try {
        let useFetch = fetchFn ?? fetch;
        let url = id ? `/api/${type}/${id}` : `/api/${type}`;
        url += `?token=${tokenKey}`;

        let res = await useFetch(url);
        if (!res.ok) {
            let json = await res.json().catch(() => ({}));
            throw error(res.status, json?.message ?? `GET ${type} failed`);
        }

        let result = await res.json();
        return result;
    } catch (err) {
        console.error('Error', err);
        throw err;
    }
    
}

// POST data
export async function addData(tokenKey: string | undefined, type: string, data: Record<string, any>) {

    let res = await fetch(`/api/${type}?token=${tokenKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    let result = await res.json();

    return {
        status: res.status,
        ok: res.ok,
        result: result
    }
}

// PUT or UPDATE data
export async function updateData(tokenKey: string | undefined, type: string, data: Record<string, any>, id:number) {
    try {
        let res = await fetch(`/api/${type}/${id}?token=${tokenKey}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`PUT ${type} failed: ${res.status}`);

        let result = await res.json();
        return { ok: res.ok, result }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// DELETE data
export async function deleteData(tokenKey: string | undefined, type: string, id: number) {
    try {
        let res = await fetch(`/api/${type}/${id}?token=${tokenKey}`, {
            method: 'DELETE',
        });

        if (!res.ok) throw new Error(`DELETE ${type} failed: ${res.status}`);

        let result = await res.json();
        return { ok: res.ok, result }
    } catch (err) {
        console.error(err);
        throw err;
    }

}

export async function addContent(tokenKey: string | undefined, data: Record<string, any> | null, tabContent: TabInterface) {
    if(!data) return;

    data.content = tabContent;
    try {
        let result = await updateData(tokenKey, `pd`, data, data.id);
        return result;

    } catch(err) {
        console.error(err);
        return err
    }
}

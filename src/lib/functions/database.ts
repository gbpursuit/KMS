
/* PROGRAM DATA */
// GET data
import { error as svelteError } from '@sveltejs/kit';

export async function getData(type: string, fetchFn?: typeof fetch) {
	let useFetch = fetchFn ?? fetch;

	const res = await useFetch(`/api/${type}`);
	if (!res.ok) {
		const json = await res.json().catch(() => ({}));
		throw svelteError(res.status, json?.message ?? `GET ${type} failed`);
	}

	return await res.json();
}

// POST data
export async function addData(type: string, data: Record<string, any>) {

    console.log("Data:", data);
    let res = await fetch(`/api/${type}`, {
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
export async function updateData(type: string, data: Record<string, any>) {
    try {
        let res = await fetch(`/api/${type}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!res.ok) throw new Error(`PUT ${type} failed: ${res.status}`);
        return await res.json()
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// DELETE data
export async function deleteData(type:string, id: number) {
    try {
        let res = await fetch(`/api/${type}`, {
            method: 'DELETE',
        });

        if (!res.ok) throw new Error(`DELETE ${type} failed: ${res.status}`);
        return await res.json();
    } catch (err) {
        console.error(err);
        throw err;
    }

}

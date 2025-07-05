
/* PROGRAM DATA */
// GET data
import { error as svelteError } from '@sveltejs/kit';
import type { TabInterface } from '$lib/functions/tab-content'

export async function getData(type: string, fetchFn?: typeof fetch, id?: number | string) {
	let useFetch = fetchFn ?? fetch;

    let url = id ? `/api/${type}/${id}` : `/api/${type}`;

	let res = await useFetch(url);
	if (!res.ok) {
		let json = await res.json().catch(() => ({}));
		throw svelteError(res.status, json?.message ?? `GET ${type} failed`);
	}

    let result = await res.json();
	return result;
}

// POST data
export async function addData(type: string, data: Record<string, any>) {

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
export async function updateData(type: string, data: Record<string, any>, id:number) {
    try {
        let res = await fetch(`/api/${type}/${id}`, {
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
export async function deleteData(type:string, id: number) {
    try {
        let res = await fetch(`/api/${type}/${id}`, {
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

export async function addImageData(file: File | null, leader: string | null = null) {
    let data = new FormData();
	if (file) data.append('file', file);
    if (leader) data.append('leader', leader);

    let res = await fetch(`/api/upload`, {
        method: 'POST', 
        body: data
    })

    if (!res.ok) {
        throw new Error('Upload failed');
    }

    let { path } = await res.json();
    return path;
}

export async function addContent(data: Record<string, any> | null, tabContent: TabInterface) {
    if(!data) return;

    data.content = tabContent;
    try {
        let result = await updateData(`pd`, data, data.id);
        return result;

    } catch(err) {
        console.error(err);
    }
}

export async function uploadFileWithProgress(file: File | null, leader: string | null = null, onProgress: (percent: number) => void): Promise<string> {
	return new Promise((resolve, reject) => {
		let formData = new FormData();
		if (file) formData.append('file', file);
		if (leader) formData.append('leader', leader);

		let xhr = new XMLHttpRequest();

		xhr.upload.onprogress = (event) => {
			if (event.lengthComputable) {
				let percent = Math.round((event.loaded / event.total) * 100);
				onProgress(percent);
			}
		};

		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) {
				let response = JSON.parse(xhr.responseText);
				resolve(response.path);
			} else {
				reject(new Error('Upload failed'));
			}
		};

		xhr.onerror = () => reject(new Error('Network error during upload'));

		xhr.open('POST', '/api/upload');
		xhr.send(formData);
	});
}
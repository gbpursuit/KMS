import { error } from '@sveltejs/kit';

export function getFileType(filename: string): { type: 'image' | 'video' | 'pdf' | 'csv' | 'other'; maxSizeMB: number } {
	if (/\.(png|jpe?g|gif|webp)$/i.test(filename)) return { type: 'image', maxSizeMB: 5 };
	if (/\.(mp4|mov|webm|avi)$/i.test(filename)) return { type: 'video', maxSizeMB: 75 };
	if (filename.endsWith('.pdf')) return { type: 'pdf', maxSizeMB: 10 };
	if (filename.endsWith('.csv')) return { type: 'csv', maxSizeMB: 10 };
	return { type: 'other', maxSizeMB: 1 };
}

export async function addImageData(file: File | null, title: string | null = null) {
    let data = new FormData();
	if (file) data.append('file', file);
    if (title) data.append('title', title);

    let res = await fetch(`/api/upload`, {
        method: 'POST', 
        body: data
    })

    if (!res.ok) {
        throw error(500, 'Upload Failed');
    }

    let { path } = await res.json();
    return path;
}

export async function uploadFileWithProgress(file: File | null, title: string | null = null, onProgress: (percent: number) => void): Promise<string> {
	return new Promise((resolve, reject) => {
		let formData = new FormData();
		if (file) formData.append('file', file);
		if (title) formData.append('title', title);

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

export async function removeFile(file: string, title: string | null = null): Promise<void> {

	console.log('title', title)
	const response = await fetch('/api/remove', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			filePath: file,
			title: title
		}),
	});

	console.log('response', response);

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error?.error || 'Failed to remove file');
	}

	// return new Promise((resolve, reject) => {
	// 	let formData = new FormData();
	// 	if (file) formData.append('file', file);
	// 	if (title) formData.append('title', title);

	// 	let xhr = new XMLHttpRequest();

	// 	xhr.onload = () => {
	// 		if (xhr.status >= 200 && xhr.status < 300) {
	// 			let response = JSON.parse(xhr.responseText);
	// 			resolve(response.path);
	// 		} else {
	// 			reject(new Error('Remove failed'));
	// 		}
	// 	};

	// 	xhr.onerror = () => reject(new Error('Network error during remove'));

	// 	xhr.open('POST', '/api/remove');
	// 	xhr.send(formData);
	// });
}
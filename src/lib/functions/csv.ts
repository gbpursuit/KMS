import Papa from 'papaparse';

export async function getSampleHeaders(path: string): Promise<string[]> {
    const res = await fetch(path); // Adjust if needed KMS\static\uploads\standardCSVFile\registration.csv
    const text = await res.text();

    const parsed = Papa.parse<Record<string, string>>(text, {
        header: true,
        skipEmptyLines: true
    });

    // Return header fields (trimmed)
    return parsed.meta.fields?.map(h => h.trim()) ?? [];
}

export function arraysMatch(a: string[], b: string[]) {
	return a.length === b.length && a.every((val, i) => val === b[i]);
}
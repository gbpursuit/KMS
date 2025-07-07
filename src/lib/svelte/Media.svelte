<script lang="ts">
    import Papa from 'papaparse';
    import EvaluationSelect from './professional-development/EvaluationSelect.svelte'
    let { style = $bindable(), filePath = $bindable(), addStyle = '', ...props } = $props()
    let styleValue = $state('');


    $effect(() => {
		switch (style) {
			case 'image':
                styleValue = 'flex rounded-xl w-full justify-center';
                break;
            case 'video':
                styleValue = 'rounded-xl';
                break;
            case 'pdf':
                styleValue = 'w-full h-[75dvh] border rounded-xl';
                break;
			default:
				break;
		}
    })

    let csvData: Record<string, string>[] = $state([]); // or $state<Record<string, string>[]>([]);
    let csvHeaders: string[] = $state([]);
    let nameGrouped: Record<string, Record<string, string>> = $state({});

	async function parseCSV(path: string) {
		try {
			const res = await fetch(path);
			const text = await res.text();

			const parsed = Papa.parse<Record<string, string>>(text, {
				header: true,
				skipEmptyLines: true,
			});

			csvData = parsed.data;
            csvData.forEach(entry => {
                let nameField = "Name (Last Name, First Name, Middle Initial) ";
                let  name = entry[nameField];
                if (name) {
                    let { [nameField]: _, ...rest } = entry;
                    nameGrouped[name] = rest;
                }
            });
            csvHeaders = parsed.meta.fields ?? [];

			console.log(csvData); 
            console.log(nameGrouped);
		} catch (err) {
			console.error('Failed to parse CSV:', err);
		}
	}

	$effect(() => {
		if (style === 'csv' && filePath) {
			parseCSV(filePath);
		}
	});


</script>

{#if style === 'image'}
    <img src={filePath} alt="" class = "{styleValue} {addStyle}" />
{:else if style === "video"}
    <video src={filePath} controls class = "{styleValue} {addStyle}">
        <track kind="captions" label="No captions" srcLang="en" />
    </video>
{:else if style === "pdf"}
    <iframe src={filePath} title="Uploaded PDF" class="{styleValue} {addStyle}"></iframe>
{:else if style === 'csv'}
    <EvaluationSelect bind:nameGrouped={nameGrouped} bind:csvData={csvData} />
{/if}

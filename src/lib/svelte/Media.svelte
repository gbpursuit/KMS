<script lang="ts">
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
    <EvaluationSelect bind:filePath={filePath} />
{/if}

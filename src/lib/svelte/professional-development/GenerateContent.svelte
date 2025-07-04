<script lang="ts">
    import type { EditableContent, TabInterface } from "$lib/functions/tab-content";
    
    import Button from "../Button.svelte";
    import Heading from "../Heading.svelte";

    let { tabContent = $bindable() }: { tabContent: TabInterface } = $props()
    let hideContent = $state(true)

    async function generatePDF() {
        hideContent = false;
        const response = await fetch('/api/pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tabContent)
        });

        const { html } = await response.json();

        const preview = document.getElementById('pdf-preview') as HTMLIFrameElement;
        if (preview) {
            preview.srcdoc = html;
        }
    }
</script>

<!-- PDF Button -->
<div class="w-full flex justify-center mt-10">
    <Button style="submit" addStyle="max-w-[400px]" onclick={generatePDF}>
        <div>Generate Training Report PDF</div>
    </Button>
</div>

<!-- PDF Preview -->
<div class="w-full mt-10" hidden={hideContent}>
    <Heading type="h2">PDF Preview</Heading>
    <iframe
        id="pdf-preview"
        class="w-full h-[600px] border"
        title="PDF Preview of Training Report"></iframe>
</div>
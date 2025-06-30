<script lang="ts">
    import type { EditableContent, TabInterface } from "$lib/functions/tab-content";
    import Button from "../Button.svelte";
	import Heading from "../Heading.svelte";
    let { tabContent = $bindable() }: { tabContent: TabInterface } = $props()
    
    // Need to read the other rows
    function renderTabContent(content: EditableContent | null): string {
        if (!content || typeof content !== "object") {
            return "<p>(No content)</p>";
        }

        let html = "";
        let current: EditableContent | null = content;

        while (current) {
            const text = typeof current.content === "string" ? current.content : JSON.stringify(current.content);
            html += `${text || "(No content)"}</p>`;
            current = current.next;
        }

        return html;
    }

    // Generating row logic
    async function generatePDF() {
        console.log("[PDF] Starting PDF generation...");
        console.log("[PDF] Current tabContent:", JSON.parse(JSON.stringify(tabContent)));

        let htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: sans-serif;
                        padding: 2rem;
                        color: #000;
                        background: #fff;
                    }
                    h2 {
                        font-size: 1.25rem;
                        font-weight: 600;
                        border-bottom: 1px solid #ccc;
                        margin-bottom: 0.5rem;
                    }
                    p {
                        white-space: pre-line;
                        margin-bottom: 1.5rem;
                    }
                    button#print-btn {
                        position: fixed;
                        top: 1rem;
                        right: 1rem;
                        background: #185A37;
                        color: white;
                        padding: 0.5rem 1rem;
                        border: none;
                        cursor: pointer;
                        z-index: 9999;
                    }
                    <script>
                        window.print()
                    <\/script>
                <\/style>
            <\/head>
            <body>
        `;

        for (const tab of Object.values(tabContent)) {
            htmlContent += `
                <div class="mb-6">
                    <h2>${tab.title}</h2>
                    ${renderTabContent(tab.content)}
                </div>
            `;
        }

        htmlContent += `</body></html>`;

        const preview = document.getElementById("pdf-preview") as HTMLIFrameElement;
        if (preview) {
            preview.srcdoc = htmlContent;
            console.log("[PDF] Preview updated.");
        } else {
            console.error("PDF preview iframe not found.");
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
<div class="w-full mt-10">
    <Heading type="h2">PDF Preview</Heading>
    <iframe
        id="pdf-preview"
        class="w-full h-[600px] border"
        title="PDF Preview of Training Report"></iframe>
</div>
<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import Button from "./Button.svelte";
	import Paragraph from "./Paragraph.svelte";
	import type { EditableContent } from "$lib/functions/tab-content";
	import ActiveTab from "./ActiveTab.svelte";

    type Tab = {
        title: string,
        content: EditableContent
    }

    let { activeTab = writable('Overview'), editable = $bindable(false) }: { activeTab: Writable<string>, editable?: boolean} = $props()
    
	// const CurrentComponent = derived(activeTab, ($activeTab) => tabContent[$activeTab]);

	let tabContent: Record<string, Tab> = $state({
		'Overview': {
            title: 'Training Overview',
            content:{type: 'plain', prev: false, content: '', next: null}
        },
		'Participants': {
            title: 'Training Participants',
            content:{type: 'plain', prev: false, content: '', next: null}
        },
		'Personnel': {
            title: 'Personnel',
            content:{type: 'plain', prev: false, content: '', next: null}
        },
		'Highlights': {
            title: 'Highlights',
            content:{type: 'plain', prev: false, content: '', next: null}
        },
		'Evaluation': {
            title: 'Evaluation',
            content:{type: 'plain', prev: false, content: '', next: null}
        },
		'Appendix': {
            title: 'Appendix',
            content:{type: 'plain', prev: false, content: '', next: null}
        },
	})

    function toggleMode() {
        editable = !editable
    }

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
                </style>
            </head>
            <body>
                <button id="print-btn" onclick="window.print()">Print Training Report</button>
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

<div class="p-4 text-[15px] text-gray-800 leading-relaxed bg-[#F7F7F7]">

    <!-- Toggle Button -->
    <div class="flex rtl flex-row-reverse w-full gap-4">
        <div class="flex items-center">
            <div class="flex items-center w-8 h-2 bg-blue-400 rounded-2xl">
                <Button style="editor-mode" onclick={toggleMode} addStyle={editable? 'translate-x-4 bg-green-300': 'bg-red-300'}>
                    <div></div>
                </Button>
            </div>
        </div>
        <div class="h-full">
            <Paragraph>Editor Mode</Paragraph>
        </div>
    </div>

    <ActiveTab bind:title={tabContent[$activeTab].title} bind:content={tabContent[$activeTab].content} editable={editable} />
    
	<!-- PDF Button -->
	<div class="w-full flex justify-center mt-10">
		<Button style="submit" addStyle="max-w-[400px]" onclick={generatePDF}>
			<div>Generate Training Report PDF</div>
		</Button>
	</div>

	<!-- PDF Preview -->
	<div class="w-full mt-10">
		<h2 class="text-xl font-semibold text-center mb-2">PDF Preview</h2>
		<iframe
			id="pdf-preview"
			class="w-full h-[600px] border"
			title="PDF Preview of Training Report"></iframe>
	</div>

    <!-- {#if $CurrentComponent}
        {@const Component = $CurrentComponent}
        <Component bind:content={content} editable={editable}/>
    {/if} -->
</div>
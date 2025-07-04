// src/routes/api/pdf/+server.ts
import { json } from '@sveltejs/kit';
import { render } from 'svelte/server';

import Base from '$lib/svelte/pdfContent/Base.svelte';
import TitlePage from '$lib/svelte/pdfContent/TitlePage.svelte';
import TableOfContents from '$lib/svelte/pdfContent/TableOfContents.svelte';
import Section from '$lib/svelte/pdfContent/Section.svelte';

import type { RequestHandler } from './$types';
import type { TabInterface, EditableContent } from '$lib/functions/tab-content';

function renderTabContent(content: EditableContent | null): string {
    if (!content || typeof content !== 'object') {
        return '(No content)';
    }

    let output = '';
    let current: EditableContent | null = content;

    while (current) {
        const text = typeof current.content === 'string'
            ? current.content
            : JSON.stringify(current.content);

        output += (text || '(No content)') + '\n';
        current = current.next;
    }

    return output.trim();
}

export const POST: RequestHandler = async ({ request }) => {
    const tabContent: TabInterface = await request.json();
    const date = new Date().toLocaleDateString();

    const tocItems = Object.values(tabContent).map((tab, i) => ({
        index: i + 1,
        title: tab.title
    }));

    const { body: titleHtml } = render(TitlePage, { props: { date } });
    const { body: tocHtml } = render(TableOfContents, { props: { tocItems: tocItems } });

    const sectionData = Object.values(tabContent).map((tab, i) => ({
    index: i + 1,
    title: tab.title,
    content: renderTabContent(tab.content)
    }));

    const fullContent = titleHtml + tocHtml + sectionData;
    const { body } = render(Base, {
    props: {
        date: new Date().toLocaleDateString(),
        tocItems: sectionData.map(({ index, title }) => ({ index, title })),
        sections: sectionData
    }
    });

    return json({ html: body });
};

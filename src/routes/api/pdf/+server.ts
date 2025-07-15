// src/routes/api/pdf/+server.ts
import { json } from '@sveltejs/kit';
import { render } from 'svelte/server';

import puppeteer from 'puppeteer';
import Base from '$lib/svelte/pdf-content/Base.svelte';

import type { RequestHandler } from './$types';
import type { TabInterface, EditableContent } from '$lib/functions/tab-content';

function renderTabContent(content: EditableContent | null): string {
  let output = '';
  let current = content;

  while (current) {
    // If the content is a string, include it directly
    if (typeof current.content === 'string') {
      output += current.content.trim() + '\n';
    }
    // If it's nested EditableContent, dig deeper
    else if (current.content && typeof current.content === 'object') {
      const inner = current.content as EditableContent;
      if (typeof inner.content === 'string') {
        output += inner.content.trim() + '\n';
      } else {
        output += '(Unsupported content format)\n';
      }
    } else {
      output += '(No content)\n';
    }

    current = current.next;
  }

  return output.trim();
}

export const POST: RequestHandler = async ({ request }) => {
	const req = await request.json();

	// Validate payload
	if (!req || typeof req !== 'object') {
		return json({ error: 'Invalid request payload' }, { status: 400 });
	}

	const tabContent: TabInterface = req.tabContent ?? {};
	const selectedItem = req.selectedItem ?? {};
	const trainingTypes = req.trainingTypes ?? [];
	const summarizedTable = req.summarizedTable ?? {}
	const pdfSummary = req.pdfSummary ?? {}
	const summaryLabels = req.summaryLabels ?? {}
	const window = req.window ?? {};

	console.log

	// Safely extract values from selectedItem with fallbacks
	const moduleTitle = selectedItem.title ?? 'Untitled Module';
	const leader = selectedItem.leader ?? '—';
	const numParticipants = selectedItem.numParticipants ?? 0;
	const trainingId = selectedItem.trainingId ?? null;
	const dateStartString = selectedItem.dateStart ?? new Date().toISOString();
	const dateEndString = selectedItem.dateEnd ?? new Date().toISOString();


	const trainingType =
		trainingTypes.find((t: any) => t.id === trainingId)?.type ?? '—';

	function checking(dateParameter: string) {
		return new Date(dateParameter).toLocaleDateString('en-PH', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	// const formattedDate = new Date(dateStartString).toLocaleDateString('en-PH', {
	// 	year: 'numeric',
	// 	month: 'long',
	// 	day: 'numeric'
	// });

	const formattedDateStart = checking(dateStartString);
	const formattedDateEnd = checking(dateEndString);

	const entries = Object.entries(tabContent);
	const sortedEntries = entries.map(([key, tab]) => ({...tab, index: Number(tab.index) || 0 })).sort((a, b) => a.index - b.index);

	// console.log(tabContent)

	const tocItems = sortedEntries.map((tab, i) => ({
		index: i + 1,
		title: tab?.title ?? `Untitled Section ${i + 1}`
	}));

	const sectionData = sortedEntries.map((tab, i) => ({
		index: i + 1,
		title: tab?.title ?? `Untitled Section ${i + 1}`,
		// content: renderTabContent(tab?.content ?? null)
		content: tab?.content
	}));

	// Final props passed to Base.svelte
	const props = {
		moduleTitle,
		dateStart: formattedDateStart,
		dateEnd: formattedDateEnd,
		leader,
		numParticipants,
		trainingType,
		tocItems,
		sections: sectionData,
		origin: window.origin,
		summarizedTable,
		pdfSummary,
		summaryLabels
	};

	// console.log('Generating PDF with:', props);

	const { body } = render(Base, { props });

	const html = `
		<html>
			<head>
				<meta charset="UTF-8">
				<style>
					body {
						font-family: sans-serif;
						padding: 2rem;
					}
					h1, h2, h3 {
						font-weight: bold;
					}
				</style>
			</head>
			<body>
				${body}
			</body>
		</html>
	`;

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent(html, { waitUntil: 'networkidle0' });

	const pdfBuffer = await page.pdf({
		format: 'A4',
		printBackground: true,
		displayHeaderFooter: true,
		footerTemplate: `
			<div style="font-size:10px; width:100%; text-align:center; color:gray; padding:10px;">
			<span class="pageNumber"></span> / <span class="totalPages"></span>
			</div>`,
		margin: {
			top: '1cm',
			bottom: '2cm',
			left: '1.5cm',
			right: '1.5cm'
		}
	});

	await browser.close();

	const base64PDF = Buffer.from(pdfBuffer).toString('base64');

	return json({
		success: true,
		filename: 'Training_Report.pdf',
		base64: base64PDF,
		mimeType: 'application/pdf'
	});
};
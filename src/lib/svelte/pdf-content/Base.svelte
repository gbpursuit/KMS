<script lang="ts">
  import TitlePage from './TitlePage.svelte';
  import TableOfContents from './TableOfContents.svelte';
  import Section from './Section.svelte';
	import type { EditableContent } from '$lib/functions/tab-content';

  export let moduleTitle: string;
  export let date: string;
  export let leader: string;
  export let numParticipants: number;
  export let trainingType: string;
  export let tocItems: { index: number; title: string }[];
  export let sections: { index: number; title: string; content: EditableContent }[];
  export let window: any;

  const tocWithPages = tocItems.map((item, i) => ({
    ...item,
    page: i + 3
  }));
</script>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- <title>Training Report</title> -->
    <style>
      body {
        font-family: sans-serif;
        padding: 2rem;
        color: #000;
        background: #fff;
        counter-reset: page 1;
      }

      h1, h2, h3 { color: #1a1a1a; }

      .title-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 90vh;
        page-break-after: always;
        text-align: center;
      }

      .title-page h1 {
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        color: #1b663e;
      }

      .title-page p {
        font-size: 1.15rem;
        margin: 0.3rem 0;
      }

      .title-page .meta {
        margin-top: 2rem;
        font-size: 1rem;
      }

      .toc {
        margin: 4rem 0;
        page-break-after: always;
      }

      .toc h2 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      .toc ul {
        list-style: none;
        padding: 0;
      }

      .toc li {
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding-bottom: 0.2rem;
      }

      .section {
        padding: 1rem 0;
        page-break-after: auto;
      } 

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        border-bottom: 1px solid #ccc;
        margin: 2rem 0 0.5rem;
      }

      p {
        white-space: pre-line;
        margin-bottom: 1.5rem;
      }

      .page-break {
        page-break-before: always;
      }

      .page-number {
        position: fixed;
        bottom: 1.5cm;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 0.8rem;
        color: #888;
      }

      .section::after {
        content: counter(page);
        position: absolute;
        bottom: 1.5cm;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 0.8rem;
        color: #888;
      }

      @page {
        margin: 2cm;
      }

      @media print {
        body::after {
          position: fixed;
          bottom: 0.5cm;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 0.8rem;
          color: #888;
        }
      }
    </style>

  </head>

  <body>
    <div class="title-page">
      <TitlePage
        {moduleTitle}
        {date}
        {leader}
        {numParticipants}
        {trainingType}
      />
    </div>

    <div class="toc">
      <TableOfContents tocItems={tocWithPages} />
    </div>

    {#each sections as section}
      <div class="section page-break" id={"section-" + section.index}>
        <Section origin={window.origin} {...section} />
      </div>
    {/each}
  </body>
</html>
<script lang="ts">
  import TitlePage from './TitlePage.svelte';
  import TableOfContents from './TableOfContents.svelte';
  import Section from './Section.svelte';

  export let date: string;
  export let tocItems: { index: number; title: string }[];
  export let sections: { index: number; title: string; content: string }[];
</script>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Training Report</title>
    <style>
      body { font-family: sans-serif; padding: 2rem; color: #000; background: #fff; }
      h1, h2, h3 { color: #1a1a1a; }
      .title-page {
        display: flex; flex-direction: column;
        justify-content: center; align-items: center;
        height: 100vh; page-break-after: always;
      }
      .toc { margin-top: 4rem; margin-bottom: 4rem; page-break-after: always; }
      .toc h2 { font-size: 1.5rem; margin-bottom: 1rem; }
      .toc ul { list-style-type: none; padding-left: 0; }
      .toc li { margin-bottom: 0.5rem; }
      .section { page-break-before: always; }
      h2 { font-size: 1.25rem; font-weight: 600; border-bottom: 1px solid #ccc; margin-top: 2rem; margin-bottom: 0.5rem; }
      p { white-space: pre-line; margin-bottom: 1.5rem; }
      button#print-btn {
        position: fixed; top: 1rem; right: 1rem;
        background: #185A37; color: white;
        padding: 0.5rem 1rem; border: none; cursor: pointer;
        z-index: 9999;
      }
    </style>
  </head>
  <body>
    <button id="print-btn" onclick={() => window.print()}>Print</button>

    <TitlePage {date} />
    <TableOfContents {tocItems} />

    {#each sections as section}
      <Section {...section} />
    {/each}
  </body>
</html>

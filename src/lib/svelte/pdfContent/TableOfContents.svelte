<script lang='ts'>
  export let tocItems: { index: number, title: string }[];
</script>

<div class="toc">
  <h2>Table of Contents</h2>
  <ul>
    {#each tocItems as item}
      <li><a href="#section-{item.index}">{item.title}</a></li>
    {/each}
  </ul>
</div>

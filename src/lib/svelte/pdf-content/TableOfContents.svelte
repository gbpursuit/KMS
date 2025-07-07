<script lang="ts">
  export let tocItems: { index: number; title: string; page: number }[];
</script>

<div class="toc">
  <h2 class="text-xl font-semibold mb-4">Table of Contents</h2>
  <ul class="list-none pl-0 space-y-2">
    {#each tocItems as item}
      <li class="flex justify-between border-b pb-1">
        <span>{item.title}</span>
        <span>{item.page}</span>
      </li>
    {/each}
  </ul>
</div>

<script lang="ts">
  export let index: number;
  export let title: string;
  export let content: string;
</script>

<div class="section" id="section-{index}">
  <h2>{title}</h2>
  {#each content.split('\n') as line}
    <div>{line}</div>
  {/each}
</div>

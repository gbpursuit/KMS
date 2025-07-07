<script lang="ts">
  export let index: number;
  export let title: string;
  export let content: string;
</script>

<div class="section page-break">
  <h2>{index}. {title}</h2>
  {#each content.split('\n') as line}
    <p>{line}</p>
  {/each}
</div>

<style>
  .section {
    padding-top: 2rem;
  }

  h2 {
    color: #0b3d2e;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;
  }

  p {
    line-height: 1.6;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .page-break {
    page-break-before: always;
  }
</style>

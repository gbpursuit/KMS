<script lang="ts">
  export let moduleTitle: string;
  export let dateStart: string;
  export let dateEnd: string;
  export let leader: string;
  export let numParticipants: number;
  export let trainingType: string;
</script>

<div class="title-page">
  <h1>{moduleTitle}</h1>
  <p class="meta"><strong>Training Type:</strong> {trainingType}</p>
  <p class="meta"><strong>Number of Participants:</strong> {numParticipants}</p>
  <p class="meta"><strong>Project Leader:</strong> {leader}</p>
  <p class="meta"><strong>Date Started:</strong> {dateStart}</p>
  <p class="meta"><strong>Date End:</strong> {dateEnd}</p>
</div>

<style>
  .title-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
</style>

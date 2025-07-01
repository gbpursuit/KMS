<script lang='ts'>
  import Heading from '$lib/svelte/Heading.svelte';
  import Paragraph from '$lib/svelte/Paragraph.svelte';
	import ProgramCard from '$lib/svelte/program/ProgramCard.svelte';
  import '@fortawesome/fontawesome-svg-core/styles.css';
  import { faAtom, faClipboard, faPersonChalkboard, faPalette } from '@fortawesome/free-solid-svg-icons';
  import { currentModule, selectedModuleItem } from '$lib/functions/module';
  import type { PageProps } from './$types';

  import { onMount } from 'svelte';
  import { type ProgramAll } from '$lib/functions/module';

  let { data } : PageProps = $props();

  let programList: ProgramAll[] = $state([]);
  let iconMap: Record<string, any> = {
    'Research': faAtom,
    'Curriculum Development': faClipboard,
    'Professional Development': faPersonChalkboard,
    'Extension': faPalette
  };

  onMount(async () => {
    programList = data.programs.map((p) => ({...p, icon: iconMap[p.name]}));
  });

  $effect(() => {
    currentModule.set(null);
    selectedModuleItem.set(null);
  })


</script>

<svelte:head>
	<title>UP Nismed KMS</title>
</svelte:head>

<div id="landing" class="relative flex items-center justify-center w-full h-[calc(100dvh-120px)] mt-[120px] bg-cover bg-center bg-no-repeat" style="background-image: url('/NISMEDfrontpage.jpg');">
    <div class="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

    <div class="relative w-[90%] max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 px-8 py-6 animate-fade-in-up transition-all duration-1000 ease-out">
    <Heading style="home-title">Knowledge Management System</Heading>
    </div>
</div>

<div id = "program" class="flex flex-col w-full h-full">
    <div class="flex flex-col w-full h-full justify-center items-center px-16 py-10 gap-10">
        <div class="flex w-[90%] max-h-full p-2 flex-wrap items-center justify-center ">
            <div class="flex flex-col w-full gap-2 justify-center">
                <Heading>About KMS</Heading>
                <Paragraph>
                    <strong>Knowledge Management System (KMS)</strong> is a digital platform designed to centralize, organize, and make accessible key information and outputs from NISMED’s core programs. The KMS enhances documentation, collaboration, and knowledge sharing across departments.
                </Paragraph>

                <Heading>Programs</Heading>
                <Paragraph>
                    Explore our current programs available at UP NISMED, aimed at advancing research, curriculum innovation, professional development, and community extension in science and mathematics education. 
                </Paragraph>
            </div>
        </div>
        <div class="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 w-[90%] h-[70%] place-items-center gap-6">

                {#each programList as program}
                    <ProgramCard program={program} data={data}/>
                {/each}
        </div>
    </div>
</div>

<style>
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
  }
</style>

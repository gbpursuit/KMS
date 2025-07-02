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
	import Button from '$lib/svelte/Button.svelte';

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

  function visitWebsite() {
    window.open('https://nismed.upd.edu.ph/')
  }

</script>

<svelte:head>
	<title>UP Nismed KMS</title>
</svelte:head>

<div class="flex overflow-hidden">
  <div id="landing" class="relative flex items-center justify-start w-full h-[calc(100dvh-120px)] mt-[120px] overflow-hidden">
    <div class="absolute inset-0 bg-cover bg-center bg-no-repeat transition duration-1000 ease-in-out hover:scale-[1.05] z-0"
         style="background-image: url('/NISMEDfrontpage.jpg');">
    </div>
    <div class="absolute inset-0 bg-gradient-to-r from-[#003322]/90 to-transparent backdrop-blur-[1px] z-0 pointer-events-none"></div>
    <div class="flex relative z-1 w-full pl-12 pr-6">
      <div class="flex flex-col w-full max-w-4xl space-y-6 animate-fade-in-up text-shadow-md transition-all duration-1000 ease-out">
        <Heading addStyle="text-[60px] md:text-[70px] lg:text-[75px] xl:text-[80px] font-extrabold text-white leading-tight drop-shadow-lg">
          Knowledge Management System
        </Heading>
        <Paragraph addStyle="text-white/90 text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed drop-shadow-sm max-w-2xl">
          The <strong>Knowledge Management System (KMS)</strong> is a digital platform designed to centralize, organize, and make accessible key information and outputs from NISMED’s core programs. The KMS enhances documentation, collaboration, and knowledge sharing across departments.
        </Paragraph>
        <!-- Hollow button -->
        <div class="mt-4">
          <Button style='hollow' onclick={visitWebsite}>
            Visit our Website
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>

<div id = "program" class="flex flex-col w-full h-full">
    <div class="flex flex-col w-full h-full justify-center items-center px-16 py-10 gap-10">
        <div class="flex w-[90%] max-h-full p-2 flex-wrap items-center justify-center ">
            <div class="flex flex-col w-full gap-2 justify-center">
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
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
  }

  .text-shadow-md {
    text-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  }
</style>
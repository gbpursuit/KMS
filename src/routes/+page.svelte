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
	import { getData } from '$lib/functions/database';
	import type { Account } from '@prisma/client';

  import { VIEW_CLIENT } from '$lib/functions/env';

  let { data } : PageProps = $props();
	let accounts: Account[] = $state([]); // REMOVE AFTER TESTING
  let button1Text = $state('SWITCH TO USER') // REMOVE AFTER TESTING
  let button2Text = $state('SWITCH TO ADMIN') // REMOVE AFTER TESTING
  let button3Text = $state('SWITCH TO SUPER USER') // REMOVE AFTER TESTING
  let roleId = $state(1) // REMOVE AFTER TESTING

  let pageLoaded = $state(false)
  let programList: ProgramAll[] = $state([]);
  let iconMap: Record<string, any> = {
    'Research': faAtom,
    'Curriculum Development': faClipboard,
    'Professional Development': faPersonChalkboard,
    'Extension': faPalette
  };

  let rawToken: any;

  onMount(async () => {
    rawToken = VIEW_CLIENT;
    programList = data.programs.map((p) => ({...p, icon: iconMap[p.name]}));
    pageLoaded = true
    
    accounts = await getData(rawToken, 'account'); // REMOVE AFTER USER TESTING

    if(!data.user) return; // REMOVE AFTER TESTING
    roleId = data.user.roleId // REMOVE AFTER TESTING
    button1Text = roleId == 1? 'CURRENTLY A USER': 'SWITCH TO USER' // REMOVE AFTER TESTING
    button2Text = roleId == 2? 'CURRENTLY AN ADMIN': 'SWITCH TO ADMIN' // REMOVE AFTER TESTING
    button3Text = roleId == 3? 'CURRENTLY A SUPER USER': 'SWITCH TO SUPER USER' // REMOVE AFTER TESTING
  });

  $effect(() => {
    currentModule.set(null);
    selectedModuleItem.set(null);

    if(!data.user) return;
    button1Text = roleId == 1? 'CURRENTLY A USER': 'SWITCH TO USER' // REMOVE AFTER TESTING
    button2Text = roleId == 2? 'CURRENTLY AN ADMIN': 'SWITCH TO ADMIN' // REMOVE AFTER TESTING
    button3Text = roleId == 3? 'CURRENTLY A SUPER USER': 'SWITCH TO SUPER USER' // REMOVE AFTER TESTING

    if(roleId == 3) window.location.pathname = '/manage' // REMOVE AFTER TESTING
  })

  function visitWebsite() {
    window.open('https://nismed.upd.edu.ph/')
  }

  // REMOVE AFTER USER TESTING

  async function changeRole(id: number, targetRole: number) {
      try {
          const res = await fetch(`/api/account/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ roleId: targetRole })
          });

          const temp = await res.json();

          if (res.ok) {
              roleId = targetRole
              accounts = accounts.map(acc =>
                  acc.id === id ? { ...acc, roleId: targetRole } : acc
              );
          } else {
              alert(temp.error || 'Failed to change role.');
          }
      } catch (error) {
          console.error('Error changing role:', error);
          alert('An error occurred while changing role.');
      }
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
    <div class="flex flex-col w-full h-full justify-center items-center lg:px-16 py-10 gap-10">
        <div class="flex w-[90%] max-h-full p-2 flex-wrap items-center justify-center ">
            <div class="flex flex-col w-full gap-2 justify-center">
                <Heading>Programs</Heading>
                <Paragraph>
                    Explore our current programs available at UP NISMED, aimed at advancing research, curriculum innovation, professional development, and community extension in science and mathematics education. 
                </Paragraph>
            </div>
        </div>
        {#if !pageLoaded}
          <div class="flex w-full justify-center">
            <Heading>Loading Programs</Heading>
          </div>
        {:else}
          <div class="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 w-[90%] h-[70%] place-items-center gap-6">
              {#each programList as program}
                  <ProgramCard program={program} data={data}/>
              {/each}
          </div>
          {#if data.user}
            <div class="w-full h-[1.5px] bg-green-800 mb-4 mt-8"></div>
            <div class="flex flex-col w-full gap-2 justify-center">
                <Heading>Role Change Tester</Heading>
                <Paragraph>
                    Test user, admin, and superuser roles. This feature is for testing only and will be removed before deployment.
                </Paragraph>
            </div>
            <div class="flex col w-full gap-8">
              <Button style="submit" addStyle="bg-red-800 hover:bg-red-700 font-bold" onclick={() => {if(data.user) changeRole(data.user.id, 1)}}>
                {button1Text}
              </Button>
              <Button style="submit" addStyle="bg-green-800 font-bold" onclick={() => {if(data.user) changeRole(data.user.id, 2)}}>
                {button2Text}
              </Button>
              <Button style="submit" addStyle="bg-yellow-600 hover:bg-yellow-500 font-bold" onclick={() => {if(data.user) changeRole(data.user.id, 3)}}>
                {button3Text}
              </Button>
            </div>
          {/if}
        {/if}
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
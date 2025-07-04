<script lang='ts'>
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faMagnifyingGlass, faSortDown } from '@fortawesome/free-solid-svg-icons';
	import { faUser, faBook, faLaptop } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { smoothScrollTo } from '$lib/functions/function';

	import { type Summary } from '$lib/functions/module';
	import type { ProfessionalDevelopment, Training } from '@prisma/client';
	import { getData } from '$lib/functions/database';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import { currentModule, selectedModuleItem, type ProgramAll } from '$lib/functions/module';
	import { ROUTE } from '../../routes/routes';

	let { data, currentPath } = $props()

	console.log(data.user);

	let grids: Summary[] = $state([]);

	onMount(async () => {
		let target = new URLSearchParams(window.location.search).get('scroll');
		if (target) {
			setTimeout(() => {
				smoothScrollTo(target);

				let url = new URL(window.location.href);
				url.searchParams.delete('scroll');
				window.history.replaceState({}, '', url);
			}, 100);
		}

		let pd = await getData('pd');

		let currentYear = new Date().getFullYear();
		let teachersCount: string = '';
		let trainingCount: string = '';
		let onlineCount: string = '';

		if (pd) {
			teachersCount = pd.reduce((sum: number, pd: ProfessionalDevelopment) => sum + pd.numParticipants, 0).toString();
			trainingCount = data.programs.reduce((sum: number, item: ProgramAll) => sum + item.pd.length, 0).toString();
			onlineCount = pd.filter((item: ProfessionalDevelopment) => {
				let training = data.training.find((t: Training) => t.id === item.trainingId);
				return training?.type === 'Online';
			}).length.toString();
		}

		grids.push(
			{
				name: "Teachers Trained",
				count: data.user ? (teachersCount !== '' ? teachersCount : '---') : '---',
				icon: faUser,
				label: `Short Info`,
			},
			{
				name: "Trainings Count",
				count: data.user ? (trainingCount !== '' ? trainingCount : '---') : '---',
				icon: faBook,
				label: "Short Info",
			},
			{
				name: "Online Courses",
				count: data.user ? (onlineCount !== '' ? onlineCount : '---') : '---',
				icon: faLaptop,
				label: "Short Info",
			},
		);

		grids = [...grids];
	});

	let isOpen = $state(false);
	let pathNameParts: string[] = $state([]);
	let pathIdParts: string[] = $state([]);

	$effect(() => {
		let parts = currentPath.split('/').filter(Boolean);
		parts = currentPath === '/' ? [...parts] : ['program', ...parts];
		pathIdParts = [...parts];
		pathNameParts = parts.map((part: string) => {
			if (part === 'program') return 'Programs'; 
			return part.replace('-', ' ').toLowerCase()
		});

		if ($selectedModuleItem) {
			pathNameParts = [...pathNameParts, $selectedModuleItem.title];	
			pathIdParts = [...pathIdParts, $selectedModuleItem.id.toString()];
		}
	})

	async function handleAccount(e: Event, view: 'login' | 'register' | 'logout' = 'logout') {
		e?.preventDefault();
		if (view === 'logout') {
			window.location.href = '/api/logout';
			return;
		} else {
			window.location.href = `${ROUTE.AUTH}?view=${view}`;
		}	
	}

	// Mano mano pa
	function clickFunction(link: string, e: Event) {
		e?.preventDefault();

		if (link === ROUTE.PROGRAMS) {
			goto(ROUTE.ROOT).then(() => {
				setTimeout(() => smoothScrollTo('program'), 100);
			});
			return;
		}
		goto(link);
	}

	function getHref(i: number, name: string) {
		if (name === 'program') {
			return '/program'
		}

		let check: string;
		check = '/' + pathIdParts.slice(0, i + 1).filter(part => part !== 'program').join('/');
		return check;
	}

</script>

<header id="topbar"class="fixed z-10 flex flex-col w-full min-h-[120px] top-0">
	<div class="flex z-10 w-full h-[70px] px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] py-[8px] bg-white">
		<div class="flex items-center gap-2">
			<img src="/NISMED.png" alt="NISMED Logo" class="h-full object-cover">
            <a href="/" class="flex flex-col text-black cursor-pointer">
				<h1 class="text-4xl font-bold  ">UP NISMED</h1>
				<h1 class="text-xs font-bold ">Knowledge Management System</h1>
            </a>
			<!-- <button class="flex flex-col text-black cursor-pointer"
			onclick = {() => window.location.href = "/"}
			>
				<h1 class="text-4xl font-bold  ">UP NISMED</h1>
				<h1 class="text-xs font-bold ">Knowledge Management System</h1>
			</button> -->
		</div>
		<div class="flex-grow"></div>
		<div class="flex justify-center items-center gap-3">
			{#if !data.user}
				<div class="flex justify-center items-center text black gap-2">
					<button class="cursor-pointer custom-underline leftRight" onclick={(e) => handleAccount(e, 'login')}>Login</button>
					<span>/</span>
					<button class="cursor-pointer custom-underline leftRight" onclick={(e) => handleAccount(e, 'register')}>Register</button>
				</div>
			{:else}
				<div class="flex justify-center items-center text-[#1B663E] black gap-2">
					<div class="flex gap-2 items-center">
						<span class="px-4 py-1 text-sm font-semibold"> Hello, {data.user.acctName || 'User'} </span>
						<button class="px-4 py-1 text-sm font-semibold border-1 border-[#1B663E] rounded-full bg-white text-[#1B663E] transition-all duration-300 hover:bg-[#1B663E] hover:text-white" onclick={(e) => handleAccount(e)}> Logout </button>
					</div>	
				</div>
			{/if}
			<button
			class="group flex justify-center items-center w-8 h-8 p-1 border-2 border-[#185A37] rounded-full bg-white text-white font-bold transition-all duration-300 hover:bg-[#1B663E] hover:border-[#1B663E] opacity-0"
			>
			<FontAwesomeIcon
				icon={faMagnifyingGlass}
				class="text-[#1B663E] text-sm transition-all duration-300 group-hover:text-white group-hover:scale-110"
			/>
			</button>

		</div>
	</div>
	<nav class="flex z-10 w-full h-[50px] bg-[#1B663E] text-white">
		<div class="flex w-full px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] py-[8px]">
			<div class="flex w-[70%] items-center gap-2">
				<a href="/" class="{data.user && data.user.roleId === 3 ? 'hidden' : 'inline' } custom-underline middle">Home</a>
				{#each pathIdParts as part, i}
					<span class = "{i === 0 && data.user && data.user.roleId === 3 ? 'hidden' : 'inline'}">></span>
					<button class="custom-underline middle capitalize truncate overflow-hidden whitespace-nowrap max-w-[200px] block { pathIdParts.length - 1 !== i ? 'text-white' : 'text-yellow-500'}"
						onclick={(e) => clickFunction(getHref(i, part), e) }
					>
						{decodeURIComponent(pathNameParts[i])}
				</button>
				{/each}
			</div>
			<div class="flex-grow"></div>
			<div class="flex w-[25%] justify-end items-center gap-3">
				<div class="flex justify-center items-center text black">
					<span class = "text-lg">Summary</span>
				</div>
				<button class="flex justify-center items-center w-10 h-10"
					onclick={() => isOpen = !isOpen}
				>
					<div class="flex justify-center items-center p-1 {isOpen ? "animatedDown" : "animatedUp"}">
						<FontAwesomeIcon icon={faSortDown}/>
					</div>

				</button>
			</div>
		</div>
	</nav>
	<div class="{isOpen ? 'h-[calc(65dvh-120px)]' : 'h-0'} relative z-9 flex w-full transition-height duration-600 ease-in-out">
		<div class="{isOpen ? 'translate-y-0' : '-translate-y-[calc(65dvh)]'} absolute w-full shadow-[0_15px_20px_rgba(0,0,0,0.1)] transition duration-600 ease-in-out overflow-hidden">
			<div class="flex w-full bg-[#1B663E] justify-center items-start py-6 px-6 pb-12 overflow-hidden">
				<div class="flex flex-col w-full max-w-[1280px] gap-6 overflow-hidden">
					<div class="flex items-center justify-right">
						<h1 class="text-xl sm:text-2xl md:text-3xl font-semibold text-white text-shadow-[0_5px_5px_rgba(0,0,0,0.5)] truncate">
							Summary Table List
						</h1>
					</div>

					<div class="flex flex-wrap justify-center items-start gap-6 w-full p-2">
						{#each grids as g}
							<div class="flex flex-shrink w-full sm:w-[45%] md:w-[30%] min-w-0 rounded-md bg-white px-6 py-5 shadow-[0_2px_4px_rgba(0,0,0,0.15),_0_15px_20px_rgba(0,0,0,0.18)] 
							will-change-transform transition-transform duration-500 ease-in-out hover:scale-[1.03]">
								<div class="flex justify-center items-center w-1/4 min-w-[50px] text-[#185A37]">
									<div class="flex justify-center items-center bg-[#F4F7FE] rounded-full w-12 h-12 md:w-14 md:h-14 text-lg md:text-2xl text-[#1B663E]" title="{g.name}">
										<FontAwesomeIcon icon={g.icon} />
									</div>
								</div>
								<div class="flex flex-col justify-center items-start w-3/4 min-w-0 pl-4">
								<p class="text-sm md:text-base text-[#185A37] font-semibold truncate w-full" title="{g.name}">
									{g.name}
								</p>
								<div class="flex gap-1 mt-1 justify-center items-center">
									<p class="text-[#1B663E] text-xl md:text-2xl font-bold break-words">{g.count}</p>
								</div>

								<span class="mt-1 inline-block px-2 py-0.5 text-[11px] font-medium bg-[#E9F7EF] text-[#1B663E] rounded">
									{g.label}
								</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</header>

<style>
	@keyframes down {
		from {
			transform: rotate(0deg);
		} 
		to {
			transform: rotate(180deg);
		}
	}

	@keyframes up {
		from {
			transform: rotate(180deg);
		} 
		to {
			transform: rotate(360deg);
		}
	}

	.animatedUp {
		animation: up 500ms ease-in-out forwards;
	}

	.animatedDown {
		animation: down 500ms ease-in-out forwards;
	}
</style>
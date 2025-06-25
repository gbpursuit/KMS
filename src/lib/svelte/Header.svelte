<script lang='ts'>
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faMagnifyingGlass, faSortDown } from '@fortawesome/free-solid-svg-icons';
	import { faUser, faCheck, faBagShopping, faComment } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { smoothScrollTo } from '$lib/functions/function';

	import { goto } from '$app/navigation';
	import { page } from '$app/state';

    let grids = [
        {name: "Participants Count", count: "350", icon: faUser},
        {name: "Teachers Trained", count: "350", icon: faCheck},
        {name: "Unassigned", count: "350", icon: faBagShopping},
        {name: "Unassigned", count: "350", icon: faComment}
    ]

	let isOpen = false;

	export let currentPath: string;
	import { currentModule, selectedModuleItem } from '$lib/functions/module';
	import { ROUTE } from '../../routes/routes';

	let pathNameParts: string[] = [];
	let pathIdParts: string[] = [];

	$: {
		const parts = currentPath.split(/[/\-]/).filter(Boolean);
		pathIdParts = [...parts];
		pathNameParts = parts.map((part) => {
			if (part === 'modules') return 'Modules';
			if (!isNaN(Number(part)) && $currentModule) return $currentModule.path;
			return part;
		});

		if ($selectedModuleItem) {
			pathNameParts = [...pathNameParts, $selectedModuleItem.path];	
			pathIdParts = [...pathIdParts, $selectedModuleItem.id];
		}
	}

	function go_auth(e: Event) {
		e?.preventDefault();
		window.location.href = ROUTE.AUTH;
	}

	// Mano mano pa
	function click_function(link: string, e: Event) {
		e?.preventDefault();

		if (link === ROUTE.MODULES) {
			const current = page.url.pathname;
			if (current === ROUTE.ROOT) {
				smoothScrollTo('modules');
			} else {
				goto(ROUTE.ROOT).then(() => {
					setTimeout(() => smoothScrollTo('modules'), 100);
				});
			}
			return;
		}
		goto(link);
	}

	function get_href(i: number) {
		const isLast = i === pathIdParts.length - 1;
		if (isLast && $selectedModuleItem) {
			const modules = pathIdParts.slice(0, i).join('-');
			return `/${modules}?itemId=${$selectedModuleItem.id}`;
		}
		return `/${pathIdParts.slice(0, i + 1).join('-')}`;
	}

</script>

<nav id="topbar"class="fixed z-10 flex flex-col w-full min-h-[120px] top-0">
	<div class="flex z-10 w-full h-[70px] px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] py-[8px] bg-white">
		<div class="flex items-center gap-2">
			<img src="/NISMED.png" alt="NISMED Logo" class="h-full object-cover">
            <a href="/" class="flex flex-col text-black cursor-pointer">
				<h1 class="text-4xl font-bold  ">UP NISMED</h1>
				<h1 class="text-xs font-bold ">Knowledge Management System</h1>
            </a>
			<!-- <button class="flex flex-col text-black cursor-pointer"
			on:click = {() => window.location.href = "/"}
			>
				<h1 class="text-4xl font-bold  ">UP NISMED</h1>
				<h1 class="text-xs font-bold ">Knowledge Management System</h1>
			</button> -->
		</div>
		<div class="flex-grow"></div>
		<div class="flex justify-center items-center gap-3">
			{#if currentPath === ROUTE.ROOT}
				<div class="flex justify-center items-center text black gap-2">
					<button class="cursor-pointer underline-container" on:click={go_auth}>Login</button>
					<span>/</span>
					<button class="cursor-pointer underline-container" on:click={go_auth}>Register</button>
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
	<div class="flex z-10 w-full h-[50px] bg-[#1B663E] text-white">
		<div class="flex w-full px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] py-[8px]">
			<div class="flex w-[70%] items-center items-center gap-2">
				<a href="/" class="underline-container">Home</a>
				{#each pathIdParts as part, i}
					<span>></span>
					<a 
						href={get_href(i)}
						class="underline-container capitalize truncate overflow-hidden whitespace-nowrap max-w-[200px] block {part === 'modules' ? 'text-white' : 'text-yellow-500'}"
						on:click={(e) => click_function(get_href(i), e) }
					>
						{decodeURIComponent(pathNameParts[i])}
					</a>
				{/each}
			</div>
			<div class="flex-grow"></div>
			<div class="flex w-[25%] justify-end items-center gap-3">
				<div class="flex justify-center items-center text black">
					<span class = "text-lg">Summary</span>
				</div>
				<button class="flex justify-center items-center w-10 h-10"
					on:click={() => isOpen = !isOpen}
				>
					<div class="flex justify-center items-center p-1 {isOpen ? "animatedDown" : "animatedUp"}">
						<FontAwesomeIcon icon={faSortDown}/>
					</div>

				</button>
			</div>
		</div>
	</div>
	<div class="{isOpen ? 'h-[calc(65dvh-120px)]' : 'h-0'} relative z-9 flex w-full transition-height duration-600 ease-in-out">
		<div class="{isOpen ? 'translate-y-0' : '-translate-y-[calc(65dvh)]'} absolute w-full shadow-[0_15px_20px_rgba(0,0,0,0.1)] transition duration-600 ease-in-out overflow-hidden">
			<div class="flex w-full bg-[#1B663E] justify-center items-start py-6 px-6 pb-12 overflow-hidden">
				<div class="flex flex-col w-full max-w-[1280px] gap-6 overflow-hidden">
					<div class="flex items-center justify-right">
						<h1 class="text-xl sm:text-2xl md:text-3xl font-semibold text-white text-shadow-[0_5px_5px_rgba(0,0,0,0.5)] truncate">
							Summary Table List
						</h1>
					</div>

					<div class="flex flex-wrap justify-center items-start gap-6 w-full">
						{#each grids as g}
						<div class="flex flex-shrink w-full sm:w-[45%] md:w-[30%] xl:w-[22%] min-w-0 rounded-md bg-white px-6 py-5 shadow-[0_2px_4px_rgba(0,0,0,0.15),_0_15px_20px_rgba(0,0,0,0.18)] transition-transform hover:scale-[1.03]">
							<div class="flex justify-center items-center w-1/4 min-w-[50px] text-[#185A37]">
  								<div class="flex justify-center items-center bg-[#F4F7FE] rounded-full w-12 h-12 md:w-14 md:h-14 text-lg md:text-2xl text-[#1B663E]" title="{g.name}">
									<FontAwesomeIcon icon={g.icon} />
								</div>
							</div>
							<div class="flex flex-col justify-center items-start w-3/4 min-w-0 pl-4">
							<p class="text-sm md:text-base text-[#185A37] font-semibold truncate w-full" title="{g.name}">
								{g.name}
							</p>
							<div class="flex items-baseline gap-2 mt-1">
								<p class="text-[#1B663E] text-xl md:text-2xl font-bold break-words w-full">{g.count}</p>
								<span class="text-sm text-green-500 font-semibold whitespace-nowrap">
								↑ 12%
								</span>
							</div>
							<span class="mt-1 inline-block px-2 py-0.5 text-[11px] font-medium bg-[#E9F7EF] text-[#1B663E] rounded">
								Placeholder
							</span>
							</div>
						</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</nav>

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
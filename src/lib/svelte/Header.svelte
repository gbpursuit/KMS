<script lang='ts'>
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faMagnifyingGlass, faSortDown } from '@fortawesome/free-solid-svg-icons';
	import { faUser, faCheck, faBagShopping, faComment } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { smoothScrollTo } from '$lib/functions/function';

	import { goto } from '$app/navigation';
	import { page } from '$app/state';

    let grids = [
        {name: "Unassigned", count: "350", icon: faUser},
        {name: "Unassigned", count: "350", icon: faCheck},
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
			<button class="flex justify-center items-center w-10 h-10 p-1 border-2 border-black rounded-full">
				<FontAwesomeIcon icon={faMagnifyingGlass} />
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
	<div class="{isOpen ? 'h-[calc(40dvh-120px)]' : 'h-0'} relative z-9 flex w-full transition-height duration-600 ease-in-out">
		<div class="{isOpen ? 'translate-y-0' : '-translate-y-[calc(40dvh)]'} absolute w-full h-full shadow-[0_15px_20px_rgba(0,0,0,0.1)] transition duration-600 ease-in-out">
			<div class="flex w-full h-[100%] bg-[#1B663E] justify-center items-center">
				<div class="flex flex-col w-full h-[90%] px-15 py-2 gap-1">
					<div class="flex w-full h-[20%] items-center">
						<h1 class="text-3xl font-semibold text-white text-shadow-[0_5px_5px_rgb(0_0_0_/_0.5)]">Summary Table List</h1>
					</div>
					<div class="grid grid-rows-1 grid-cols-4 items-center w-full h-[80%] gap-10 py-7">
						{#each grids as g} 
							<div class="flex w-full h-full rounded-2xl bg-white px-2 py-12 shadow-[0_15px_20px_rgba(0,0,0,0.18)]">
								<div class="flex justify-center items-center h-full w-[30%]">
									<div class="flex justify-center items-center p-1 rounded-full w-15 h-15 bg-[#F4F7FE] text-2xl">
										<FontAwesomeIcon icon={g.icon} />
									</div>
								</div>
								<div class="flex flex-col justify-center items-start h-full w-[70%]">
									<p class = "text-lg text-[#A3AED0]">{g.name}</p>
									<p class = "text-[#1B663E] text-3xl font-bold">{g.count}</p>
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
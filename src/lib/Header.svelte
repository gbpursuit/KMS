<script lang='ts'>
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faMagnifyingGlass, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
	import { faUser, faCheck, faBagShopping, faComment } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

    let grids = [
        {name: "Unassigned", count: "350", icon: faUser},
        {name: "Unassigned", count: "350", icon: faCheck},
        {name: "Unassigned", count: "350", icon: faBagShopping},
        {name: "Unassigned", count: "350", icon: faComment}
    ]

	export let currentPath: string;
	// let value: string = '';

	let isOpen = false;

	$: pathParts = currentPath
		.split('/')
		.filter(Boolean); 
	$:console.log(currentPath)

	function gotoAuth(e: Event) {
		e?.preventDefault();
		window.open("/auth", "_blank")
	}

	// function open_link(link:string, e: Event) {
	// 	e?.preventDefault();
	// 	value = link;
	// 	window.open(link, "_blank");
	// }

	// $: console.log(value);
</script>

<nav class="fixed flex flex-col w-full h-[50dvh] top-0">
	<div class="flex z-10 w-full h-[70px] px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] py-[8px] bg-white">
		<div class="flex items-center justify-center gap-2">
			<img src="/NISMED.png" alt="NISMED Logo" class="h-full object-cover">
			<div class="flex flex-col text-black">
				<h1 class="text-4xl font-bold  ">UP NISMED</h1>
				<h1 class="text-xs font-bold ">Knowledge Management System</h1>
			</div>

		</div>
		<div class="flex-grow"></div>
		<div class="flex justify-center items-center gap-3">
			{#if currentPath === '/'}
				<div class="flex justify-center items-center text black gap-2">
					<button class="cursor-pointer hover:underline" on:click={gotoAuth}>Login</button>
					<span>/</span>
					<button class="cursor-pointer hover:underline" on:click={gotoAuth}>Register</button>
				</div>
			{/if}
			<button class="flex justify-center items-center w-10 h-10 p-1 border-2 border-black rounded-full">
				<FontAwesomeIcon icon={faMagnifyingGlass} />
			</button>
		</div>
	</div>
	<div class="flex z-10 w-full h-[50px] bg-[#1B663E] text-white">
		<div class="flex w-full px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] py-[8px]">
			<div class="flex items-center justify-center gap-2">
				<a href="/" class="hover:underline">Home</a>
				{#each pathParts as part, i}
					<span>></span>
					<a 
						href={"/" + pathParts.slice(0, i + 1).join('/')}
						class="hover:underline capitalize text-yellow-500"
					>
						{decodeURIComponent(part)}
					</a>
				{/each}
			</div>
			<div class="flex-grow"></div>
			<div class="flex justify-center items-center gap-3">
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
	<div class="relative z-5 flex w-full flex-grow">
		<div class="{isOpen ? 'translate-y-0' : '-translate-y-[calc(50dvh)]'} absolute w-full flex-grow bg-red-500 shadow-[0_15px_20px_rgba(0,0,0,0.25)] transition duration-600 ease-in-out">
			<div class="flex w-full h-[100%] bg-[#1B663E] justify-center items-center">
				<div class="flex flex-col w-full h-full px-15 py-13 gap-1">
					<div class="flex-grow w-full"></div>
					<div class="flex w-full h-[20%] items-center">
						<h1 class="text-4xl font-semibold text-white text-shadow-[0_5px_5px_rgb(0_0_0_/_0.5)]">Summary Table List</h1>
					</div>
					<div class="grid grid-rows-1 grid-cols-4 items-center w-full h-[80%] gap-10 py-4">
						{#each grids as g} 
							<div class="flex w-full h-full rounded-2xl bg-white px-2 py-12 shadow-[0_15px_20px_rgba(0,0,0,0.18)]">
								<div class="flex justify-center items-center h-full w-[30%]">
									<div class="flex justify-center items-center p-1 rounded-full w-15 h-15 bg-[#F4F7FE] text-2xl">
										<FontAwesomeIcon icon={g.icon} />
									</div>
								</div>
								<div class="flex flex-col justify-center items-start h-full w-[70%]">
									<p class = "text-lg text-[#A3AED0]">{g.name}</p>
									<p class = "text-[#1B663E] text-3xl font-[750]">{g.count}</p>
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
<script lang='ts'>
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

	export let currentPath: string;

	$: pathParts = currentPath
		.split('/')
		.filter(Boolean); 
	$:console.log(currentPath)

	function gotoAuth(e: Event) {
		e?.preventDefault();
		window.open("/auth", "_blank")
	}
</script>

<nav class="fixed flex flex-col w-full h-[120px] top-0">
	<div class="flex w-full h-[60px] px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] py-[8px]">
		<div class="flex items-center justify-center gap-2">
			<img src="/NISMED.png" alt="NISMED Logo" class="h-full object-cover">
			<h1 class="text-3xl font-bold">UP NISMED</h1>
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
	<div class="flex w-full h-[60px] bg-green-800 text-white">
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
		</div>
	</div>
</nav>
<script lang="ts">
	import { type ProgramAll } from '$lib/functions/module';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { ROUTE } from '../../../routes/routes';

    export let program: ProgramAll;

    let nameToCountKey = {
        'Research': 'research',
        'Curriculum Development': 'cd',
        'Professional Development': 'pd',
        'Extension': 'extension'
    } as const;

    type ProgramName = keyof typeof nameToCountKey;
    let countKey = nameToCountKey[program.name as ProgramName];
    let moduleCount = program._count?.[countKey] ?? 0;

    function handleButton(e: Event, id: number, check: boolean) {
        e?.preventDefault();
        if (!check) {
            window.location.href = `${ROUTE.AUTH}?content=${id}`;
            return;
        }
        window.location.href = `${ROUTE.PROGRAMS}-${id}`;
    }
</script>

<button class="group relative h-full w-full py-16 px-4 border-2 border-[#C3C6CE] rounded-[20px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] transition-all duration-500 hover:shadow-[0_4px_18px_rgba(27,102,62,0.5)] hover:border-[#1B663E] hover:-translate-y-3"
on:click={(e) => handleButton(e, program.id, false)}
>
    <div class="flex flex-col w-full h-[100%] gap-2 justify-center items-center">
        <FontAwesomeIcon icon={program.icon} class="text-xl lg:text-2xl xl:text-3xl text-[var(--font-green)]"/>
        <div class="flex flex-col text-black group-hover:text-[var(--font-green)] transition duration-400 ease-in-out justify-center items-center w-[80%] text-center">
            <h1 class="lg:text-lg xl:text-xl font-semibold">{program.name}</h1>
            <p class="text-xs lg:text-sm">
                {moduleCount === 0 ? 'No Modules' : moduleCount === 1 ? '1 Module' : `${moduleCount} Modules`}
            </p>
        </div>
    </div>
    <span class="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[125%] opacity-0 group-hover:translate-y-[50%] group-hover:opacity-100 transition-all duration-300 ease-out bg-[#1B663E] text-white text-sm px-4 py-1.5 rounded-xl shadow-lg">View Program</span>
</button>
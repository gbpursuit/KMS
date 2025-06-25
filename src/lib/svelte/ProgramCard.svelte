<script lang="ts">
	import { type Program } from '$lib/functions/module';
	import { ROUTE } from '../../routes/routes';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

    export let program: Program;

    function handleButton(e: Event, id: number, check: boolean) {
        e?.preventDefault();
        if (!check) {
            window.location.href = `${ROUTE.AUTH}?content=${id}`;
            return;
        }
        window.location.href = `${ROUTE.MODULES}-${id}`;
    }
</script>

<button class="flex flex-col w-[150px] h-[150px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px] rounded-3xl border border-black/20 
hover:-translate-y-3 hover:shadow-[0_15px_20px_rgba(0,0,0,0.18)] hover:text-[var(--font-green)] transition group duration-400 ease-in-out"
on:click={(e) => handleButton(e, program.id, program.allowed)}
>
    <div class="flex flex-col w-full h-[100%] gap-2 justify-center items-center">
        <FontAwesomeIcon icon={program.icon} class="text-xl lg:text-2xl xl:text-3xl text-[var(--font-green)]"/>
        <div class="flex flex-col text-black group-hover:text-[var(--font-green)] transition duration-400 ease-in-out justify-center items-center w-[80%] text-center">
            <h1 class="lg:text-lg xl:text-xl font-semibold">{program.name}</h1>
            <p class="text-xs lg:text-sm">{program.text}</p>
        </div>
    </div>
</button>
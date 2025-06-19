<script lang='ts'>
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faAtom, faClipboard, faPersonChalkboard, faPalette } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

    let modules = [
        {id: 1, name: "Research", text: "24 Courses", icon: faAtom, allowed: false},
        {id: 2, name: "Curriculum Development", text: "38 Courses", icon: faClipboard, allowed: false},
        {id: 3, name: "Professional Development", text: "38 Courses", icon: faPersonChalkboard, allowed: false},
        {id: 4, name: "Extension", text: "38 Courses", icon: faPalette, allowed: false},
    ]

    function handleButton(e: Event, id: number, check: boolean) {
        e?.preventDefault();
        if (!check) {
            window.location.href = `/auth?content=${id}`;;
            return;
        }
        window.location.href = `/modules-${id}`;
    }

    import { onMount } from 'svelte';

    onMount(() => {
        const landing = document.getElementById('landing');
        const hidden = document.getElementById('hidden');
        const modules = document.getElementById('modules');

        if (!landing || !hidden || !modules) return;

        let isFixed = false;
        let triggerY = window.innerHeight * 0.4;

        const updateTriggerY = () => {
            triggerY = window.innerHeight * 0.40;
        };
        window.addEventListener('resize', updateTriggerY);

        const stick = () => {
            const landBottom = landing.getBoundingClientRect().bottom;
            const modulesTop = modules.getBoundingClientRect().top;

            if (!isFixed && landBottom <= triggerY) {
                Object.assign(landing.style, {
                    position: 'fixed',
                    bottom: '60dvh',
                    left: '0',
                    right: '0',
                    zIndex: '8',
                    transition: 'all 0.3s ease-in-out'
                });
                hidden.style.display = 'flex';
                isFixed = true;
            }

            if (isFixed && modulesTop >= triggerY) {
                Object.assign(landing.style, {
                    position: 'static',
                    bottom: '',
                    left: '',
                    right: '',
                    zIndex: '',
                });
                hidden.style.display = 'none';
                isFixed = false;
            }
        };

        window.addEventListener('scroll', stick);
    });

</script>

<svelte:head>
	<title>UP Nismed Kms</title>
</svelte:head>

<div id="landing" class="flex w-full h-[calc(100dvh-120px)] mt-[120px] bg-cover bg-center bg-no-repeat" style="background-image:url({'/NISMEDfrontpage.jpg'})"></div>

<div id="hidden" class="hidden w-full h-screen bg-white"></div>

<div id = "modules" class="flex flex-col w-full h-[70dvh]">
    <div class="flex flex-col w-full h-full justify-center items-center py-10">
        <div class="flex w-[90%] h-[30%] p-2">
            <div class="flex flex-col w-1/2 h-full gap-2  justify-center">
                <h1 class="text-3xl font-semibold text-[var(--font-green)] text-shadow-[0_2px_5px_rgb(0_0_0_/_0.1)]">Modules</h1>
                <p class="font-light text-[var(--font-green)] text-shadow-[0_2px_5px_rgb(0_0_0_/_0.1)]">Explore our Current Modules</p>
            </div>
        </div>
        <div class="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 w-[90%] h-[70%] place-items-center">
                {#each modules as m}
                    <button class="flex flex-col w-[150px] h-[150px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px] rounded-3xl border border-black/20 
                    hover:-translate-y-3 hover:shadow-[0_15px_20px_rgba(0,0,0,0.18)] hover:text-[var(--font-green)] transition group duration-400 ease-in-out"
                    on:click={(e) => handleButton(e, m.id, m.allowed)}
                    >
                        <div class="flex flex-col w-full h-[100%] gap-2 justify-center items-center">
                            <FontAwesomeIcon icon={m.icon} class="text-xl lg:text-2xl xl:text-3xl text-[var(--font-green)]"/>
                            <div class="flex flex-col text-black group-hover:text-[var(--font-green)] transition duration-400 ease-in-out justify-center items-center w-[80%] text-center">
                                <h1 class="lg:text-lg xl:text-xl font-semibold">{m.name}</h1>
                                <p class="text-xs lg:text-sm">{m.text}</p>
                            </div>
                        </div>
                    </button>
                    
                {/each}
        </div>
    </div>
</div>

<style></style>
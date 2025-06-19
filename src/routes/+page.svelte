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

</script>

<svelte:head>
	<title>UP Nismed Kms</title>
</svelte:head>

<div class="flex w-full h-[calc(45dvh-120px)] mt-[120px] bg-cover bg-center bg-no-repeat" style="background-image:url({'/NISMEDfrontpage.jpg'})"></div>


<div id = "modules" class="flex flex-col w-full h-[70dvh]">
    <div class="flex flex-col w-full h-full justify-center items-center px-10 pt-10 pb-5 ">
        <div class="flex w-[90%] md:w-[85%] xl:w-[80%] h-[30%] p-2 ">
            <div class="flex flex-col w-1/2 h-full gap-2 ">
                <h1 class="text-3xl font-semibold text-[var(--font-green)] text-shadow-[0_2px_5px_rgb(0_0_0_/_0.1)]">Modules</h1>
                <p class="font-light text-[var(--font-green)] text-shadow-[0_2px_5px_rgb(0_0_0_/_0.1)]">Explore our Current Modules</p>
            </div>
            <!-- <div class="flex-grow"></div> -->
            <!-- <div class="flex flex-col w-1/2 h-full justify-center items-end">
                <button class="w-[150px] h-[45px] flex justify-center items-center p-3 rounded-full border-2 border-black">All Categories</button>
                <div class="h-[40%]"></div>
            </div> -->
        </div>
        <div class="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 w-full h-[70%] place-items-center">
                {#each modules as m}
                    <button class="flex flex-col w-[150px] h-[150px] sm:w-[160px] sm:h-[160px] md:w-[160px] md:h-[160px] lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px] rounded-3xl border border-black/20 
                    hover:-translate-y-3 hover:shadow-[0_15px_20px_rgba(0,0,0,0.18)] hover:text-[var(--font-green)] transition group duration-400 ease-in-out"
                    on:click={(e) => handleButton(e, m.id, m.allowed)}
                    >
                        <div class="flex flex-col w-full h-[100%] gap-2 justify-center items-center">
                            <FontAwesomeIcon icon={m.icon} class="text-3xl text-[var(--font-green)]"/>
                            <div class="flex flex-col text-black group-hover:text-[var(--font-green)] transition duration-400 ease-in-out justify-center items-center w-[80%] text-center">
                                <h1 class="text-xl font-semibold">{m.name}</h1>
                                <p class="text-sm">{m.text}</p>
                            </div>
                        </div>
                    </button>
                    
                {/each}
        </div>
    </div>
</div>
<style></style>
<script lang='ts'>
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faAtom, faClipboard, faPersonChalkboard, faPalette } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';

    let modules = [
        {name: "Research", text: "24 Courses", icon: faAtom},
        {name: "Curriculum Development", text: "38 Courses", icon: faClipboard},
        {name: "Professional Development", text: "38 Courses", icon: faPersonChalkboard},
        {name: "Extension", text: "38 Courses", icon: faPalette}
    ]

    let greenColor: string = '[#1B663E]';
</script>
<!-- bg-[#1B663E] -->

<div class="flex flex-col w-full h-[60dvh] mt-[120px]">
    <div class="flex flex-col w-full h-full justify-center items-center px-10 pt-10 pb-5 ">
        <div class="flex w-[70%] h-[20%] p-2">
            <div class="flex flex-col w-1/2 h-full gap-2 ">
                <h1 class="text-3xl font-semibold text-{greenColor} text-shadow-[0_2px_5px_rgb(0_0_0_/_0.1)]">Modules</h1>
                <p class="font-light text-{greenColor} text-shadow-[0_2px_5px_rgb(0_0_0_/_0.1)]">Explore our Current Modules</p>
            </div>
            <div class="flex flex-col w-1/2 h-full justify-center items-end">
                <button class="w-[150px] h-[45px] flex justify-center items-center p-3 rounded-full border-2 border-black">All Categories</button>
            </div>
        </div>
        <div class="flex w-full h-[80%] justify-center items-center py-10 px-40">
            <div class="flex w-full h-full justify-center items-center gap-10">
                {#each modules as m}
                    <div class="flex flex-col w-[250px] h-[250px] rounded-3xl border border-black/20 
                    hover:-translate-y-4 hover:shadow-[0_15px_20px_rgba(0,0,0,0.18)] hover:text-{greenColor} transition group duration-400 ease-in-out">
                        <div class="flex flex-col w-full h-[100%] gap-2 justify-center items-center">
                            <FontAwesomeIcon icon={m.icon} class="text-3xl"/>
                            <div class="flex flex-col text-black group-hover:text-{greenColor} transition duration-400 ease-in-out justify-center items-center w-[80%] text-center">
                                <h1 class="text-xl font-semibold">{m.name}</h1>
                                <p class="text-sm">{m.text}</p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>            
        </div>
    </div>
    <!-- <div class="flex flex-col w-full h-[55%] px-10 pt-5 pb-10 bg-green-500"></div> -->
</div>


<!-- hover:-translate-y-3 hover:shadow-[0_15px_20px_rgba(0,0,0,0.18)] -->
<style>
    /* .group:hover {
        transform: translateY(-3rem);
        box-shadow: 0px 15px 20px (0,0,0,0.18);
    } */
</style>
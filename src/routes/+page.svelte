<script lang='ts'>
	import Heading from '$lib/svelte/Heading.svelte';
	import Paragraph from '$lib/svelte/Paragraph.svelte';
  import ProgramCard from '$lib/svelte/ProgramCard.svelte';
    import '@fortawesome/fontawesome-svg-core/styles.css';
    import { faAtom, faClipboard, faPersonChalkboard, faPalette } from '@fortawesome/free-solid-svg-icons';

    let modules = [
        {id: 1, name: "Research", text: "24 Courses", icon: faAtom, allowed: false},
        {id: 2, name: "Curriculum Development", text: "38 Courses", icon: faClipboard, allowed: false},
        {id: 3, name: "Professional Development", text: "38 Courses", icon: faPersonChalkboard, allowed: false},
        {id: 4, name: "Extension", text: "38 Courses", icon: faPalette, allowed: false},
    ]

</script>

<svelte:head>
	<title>UP Nismed KMS</title>
</svelte:head>

<div id="landing" class="flex w-full h-[calc(100dvh-120px)] mt-[120px] bg-cover bg-center bg-no-repeat" style="background-image:url({'/NISMEDfrontpage.jpg'})"></div>

<div id = "modules" class="flex flex-col w-full h-full">
    <div class="flex flex-col w-full h-full justify-center items-center px-16 py-10 gap-10">
        <div class="flex w-[90%] max-h-full p-2 flex-wrap items-center justify-center ">
            <div class="flex flex-col w-full gap-2 justify-center">
                <Heading>About KMS</Heading>
                <Paragraph>
                    <strong>Knowledge Management System (KMS)</strong> is a digital platform designed to centralize, organize, and make accessible key information and outputs from NISMED’s core programs. The KMS enhances documentation, collaboration, and knowledge sharing across departments.
                </Paragraph>

                <Heading>Programs</Heading>
                <Paragraph>
                    Explore our current programs available at UP NISMED, aimed at advancing research, curriculum innovation, professional development, and community extension in science and mathematics education. 
                </Paragraph>
            </div>
        </div>
        <div class="grid grid-cols-2 grid-rows-2 md:grid-cols-4 md:grid-rows-1 w-[90%] h-[70%] place-items-center gap-6">

                {#each modules as m}
                    <ProgramCard program={m}/>
                {/each}
        </div>
    </div>
</div>

<style></style>
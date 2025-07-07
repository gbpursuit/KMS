<script lang="ts">
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faPlus, faMinus, faList } from "@fortawesome/free-solid-svg-icons";
	import { type EditableContent } from "$lib/functions/tab-content";
	import TextArea from "../TextArea.svelte";
    import UploadFile from "../Upload.svelte";
	import Button from "../Button.svelte";
    import Content from "./Content.svelte";
    let { editable, currentContent = $bindable() }: { editable: boolean, currentContent: EditableContent | null} = $props()
    let displayTextTypes = $state(false)

	function addItem(e: PointerEvent) {
        if(currentContent) {
            if(e.ctrlKey) {
                let temp = JSON.parse(JSON.stringify(currentContent))
                let prev: EditableContent = {
                    type: 'plain',
                    content: '',
                    prev: temp.prev,
                    next: temp,
                    style: {}
                }
                temp.prev = true
                currentContent = prev
            }
            else {
                let temp = JSON.parse(JSON.stringify(currentContent))
                let next: EditableContent = {
                    type: 'plain',
                    content: '',
                    prev: true,
                    next: temp.next,
                    style: {}
                }
                currentContent.next = next
            }
        }
	}

	function deleteItem(e: PointerEvent) {
        if(currentContent)
            if(currentContent.next) {
                currentContent.next.prev = currentContent.prev
                currentContent = currentContent.next
            } else if(currentContent.prev && !currentContent.next) {
                currentContent = null
            } else {
                console.log('NOPE')
            }
	}

</script>

{#if currentContent}
    <div class="flex flex-col gap-2">
        <div class="flex flex-row w-full items-center gap-2">
            <!-- {JSON.stringify(currentContent)} -->
            {#if currentContent.type === 'plain' || currentContent.type === 'heading'}
                <TextArea type="text" bind:style={currentContent.type} disabled={!editable} bind:text={currentContent.content} />
            {:else}
                <UploadFile bind:style={currentContent.type} disabled={!editable} bind:filePath={currentContent.content} editable={editable} />
            {/if}
            <div class="flex flex-row gap-2 transition-width duration-700 ease-in-out {editable? 'w-[60px]' : 'w-0'} overflow-hidden">
                <Button addStyle="transition duration-100 hover:text-green-500 cursor-pointer {editable? 'opacity-100': 'opacity-0'}" onclick={addItem} disabled={!editable}>
                    <FontAwesomeIcon icon={faPlus}/>
                </Button>
                <div class="flex">
                    <div class="absolute w-[75px] mt-5 shadow-lg" hidden={!displayTextTypes}>
                        <div class="flex flex-col items-start">
                            <Button style = "add-item" onclick={() => {if(currentContent) currentContent.type='plain'; displayTextTypes=!displayTextTypes}}> Plain </Button>
                            <Button style = "add-item" onclick={() => {if(currentContent) currentContent.type='heading'; displayTextTypes=!displayTextTypes}}> Heading </Button>
                            <Button style = "add-item" onclick={() => {if(currentContent) currentContent.type='image'; displayTextTypes=!displayTextTypes}}> Image </Button>
                            <Button style = "add-item" onclick={() => {if(currentContent) currentContent.type='video'; displayTextTypes=!displayTextTypes}}> Video </Button>
                            <Button style = "add-item" onclick={() => {if(currentContent) currentContent.type='pdf'; displayTextTypes=!displayTextTypes}}> PDF </Button>
                        </div>
                    </div>
                    
                    <Button addStyle="transition duration-500 hover:text-blue-500 cursor-pointer {editable? 'opacity-100': 'opacity-0'}" onclick={() => {displayTextTypes = !displayTextTypes}} disabled={!editable}>
                        <FontAwesomeIcon icon={faList}/>
                    </Button>
                </div>
                <Button addStyle="transition duration-500 hover:text-red-500 cursor-pointer {editable && (currentContent.prev || currentContent.next)? 'opacity-100': 'opacity-0 pointer-events-none'}" onclick={deleteItem} disabled={!editable && (currentContent.prev || currentContent.next)}>
                    <FontAwesomeIcon icon={faMinus}/>
                </Button>
            </div>
        </div>

        {#if currentContent.next}
            <Content editable={editable} bind:currentContent={currentContent.next}/>
        {/if}
    </div>
{/if}
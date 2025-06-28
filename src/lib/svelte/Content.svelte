<script lang="ts">
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faPlus, faMinus, faList } from "@fortawesome/free-solid-svg-icons";
	import { type EditableContent } from "$lib/functions/tab-content";
	import TextArea from "./TextArea.svelte";
	import Button from "./Button.svelte";
    import Content from "./Content.svelte";
    let { editable, currentContent = $bindable() }: { editable: boolean, currentContent: EditableContent | null} = $props()
    let displayTextTypes = $state(false)
    
    $inspect(displayTextTypes)

	function addItem(e: PointerEvent) {
        if(currentContent) {
            if(e.ctrlKey) {
                let temp = JSON.parse(JSON.stringify(currentContent))
                let prev: EditableContent = {
                    type: 'plain',
                    content: '',
                    prev: temp.prev,
                    next: temp
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
                    next: temp.next
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
            <TextArea type="text" bind:style={currentContent.type} disabled={!editable} bind:text={currentContent.content} />
            <Button addStyle="transition duration-500 hover:text-green-500 {editable? 'opacity-100': 'opacity-0'}" onclick={addItem} disabled={!editable}>
                <FontAwesomeIcon icon={faPlus}/>
            </Button>
            <div class="flex">
                <div class="absolute bg-red-500 w-100% h-[24px] top-0.1" hidden={!displayTextTypes}>
                    <div class="flex-col">
                        <Button onclick={() => {if(currentContent) currentContent.type='plain'; displayTextTypes=!displayTextTypes}}> Plain </Button>
                        <Button onclick={() => {if(currentContent) currentContent.type='heading'; displayTextTypes=!displayTextTypes}}> Heading </Button>
                    </div>
                </div>
                <Button addStyle="transition duration-500 hover:text-blue-500 {editable? 'opacity-100': 'opacity-0'}" onclick={() => {displayTextTypes = !displayTextTypes}} disabled={!editable}>
                    <FontAwesomeIcon icon={faList}/>
                </Button>
            </div>
            <Button addStyle="transition duration-500 hover:text-red-500 {editable && (currentContent.prev || currentContent.next)? 'opacity-100': 'opacity-0'}" onclick={deleteItem} disabled={!editable && (currentContent.prev || currentContent.next)}>
                <FontAwesomeIcon icon={faMinus}/>
            </Button>
        </div>

        {#if currentContent.next}
            <Content editable={editable} bind:currentContent={currentContent.next}/>
        {/if}
    </div>
{/if}
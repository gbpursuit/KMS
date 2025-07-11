<script lang="ts">
	import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
	import { faPlus, faMinus, faList } from "@fortawesome/free-solid-svg-icons";
	import { type EditableContent } from "$lib/functions/tab-content";
	import TextArea from "../TextArea.svelte";
    import UploadFile from "../Upload.svelte";
	import Button from "../Button.svelte";
    import Content from "./Content.svelte";
	import Select from "../Select.svelte";
    let { editable, currentContent = $bindable(), title, leader = $bindable(), allAccounts = $bindable() }: { editable: boolean, currentContent: EditableContent | null, title: string, leader: string, allAccounts: Array<string>} = $props()
    let displayTextTypes = $state(false)

    $effect(() => {
        if(currentContent?.type == 'select-leader') currentContent.content = leader
    })
	
    function addItem(e: PointerEvent) {
        if(currentContent) {
            if(e.ctrlKey) {
                let temp = JSON.parse(JSON.stringify(currentContent))
                let prev: EditableContent = {
                    type: currentContent.type,
                    disabled: false,
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
                    type: currentContent.type,
                    disabled: false,
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

    function verifyChange(currentType: EditableContent | null, changeType: string) {
        if (!currentType) return;

        const isTextType = currentType.type === 'plain' || currentType.type === 'heading';

        if (isTextType && currentType.content) {
            const confirmed = confirm('Changing this to an upload type will remove current content. Continue?');
            if (!confirmed) return;
            currentType.content = "";
        }

        currentType.type = changeType;
        displayTextTypes = !displayTextTypes;
    }

    let addToolTip = `Add item\n(Ctrl + Click to insert above)`;

</script>

{#if currentContent}
    <div class="flex flex-col gap-2">
        <div class="flex flex-row w-full items-center gap-2 relative">
            <!-- {JSON.stringify(currentContent)} -->
            {#if currentContent.type === 'plain' || currentContent.type === 'heading'}
                <TextArea type="text" bind:style={currentContent.type} disabled={!editable || currentContent.disabled} bind:text={currentContent.content} />
            {:else if currentContent.type === 'select-leader'}
                <Select style="module-select" options={allAccounts} bind:selected={leader} disabled={!editable || currentContent.disabled} placeholder='a User'/>
            {:else if currentContent.type === 'select-account'}
                <Select style="module-select" options={allAccounts} bind:selected={currentContent.content} disabled={!editable || currentContent.disabled} placeholder='a User'/>
            {:else}
                <UploadFile title={title} bind:style={currentContent.type} disabled={!editable || currentContent.disabled} bind:filePath={currentContent.content} editable={editable} />
            {/if}
            {#if !currentContent.disabled && currentContent.type != 'select-leader'}
            <div class="flex flex-row gap-2 transition-width duration-700 ease-in-out {editable? 'w-[60px]' : 'w-0'} overflow-hidden">
                <Button addStyle="transition duration-100 hover:text-green-500 cursor-pointer  {editable? 'opacity-100': 'opacity-0'} addShow buttonShow" data-tooltip={addToolTip} onclick={addItem} disabled={!editable}>
                    <FontAwesomeIcon icon={faPlus}/>
                </Button>
                <div class="flex">
                    <div class="absolute w-[75px] mt-5 shadow-lg" hidden={!displayTextTypes}>
                        <div class="flex flex-col items-start">
                            <Button style = "add-item" onclick={() => {if(currentContent) currentContent.type='plain'; displayTextTypes=!displayTextTypes}}> Plain </Button>
                            <Button style = "add-item" onclick={() => {if(currentContent) currentContent.type='heading'; displayTextTypes=!displayTextTypes}}> Heading </Button>
                            <Button style = "add-item" onclick={() => {if(currentContent) currentContent.type='select-account'; displayTextTypes=!displayTextTypes}}> Accounts </Button>
                            <Button style = "add-item" onclick={() => {verifyChange(currentContent, 'image')}}> Image </Button>
                            <Button style = "add-item" onclick={() => {verifyChange(currentContent, 'video')}}> Video </Button>
                            <Button style = "add-item" onclick={() => {verifyChange(currentContent, 'pdf')}}> PDF </Button>
                            <!-- <Button style = "add-item" onclick={() => {if(currentContent) currentContent.type='image'; displayTextTypes=!displayTextTypes}}> Image </Button>
                            <Button style = "add-item" onclick={() => {if(currentContent) currentContent.type='video'; displayTextTypes=!displayTextTypes}}> Video </Button>
                            <Button style = "add-item" onclick={() => {if(currentContent) currentContent.type='pdf'; displayTextTypes=!displayTextTypes}}> PDF </Button> -->
                        </div>
                    </div>
                    
                    <Button addStyle="transition duration-500 hover:text-blue-500 cursor-pointer {editable? 'opacity-100': 'opacity-0'} optionShow buttonShow" data-tooltip="Options" onclick={() => {displayTextTypes = !displayTextTypes}} disabled={!editable}>
                        <FontAwesomeIcon icon={faList}/>
                    </Button>
                </div>
                <Button addStyle="transition duration-500 hover:text-red-500 cursor-pointer {editable && (currentContent.prev || currentContent.next)? 'opacity-100': 'opacity-0 pointer-events-none'} deleteShow buttonShow" data-tooltip="Remove Item" onclick={deleteItem} disabled={!editable && (currentContent.prev || currentContent.next)}>
                    <FontAwesomeIcon icon={faMinus}/>
                </Button>
            </div>
            {/if}
        </div>

        {#if currentContent.next}
            <Content title={title} editable={editable} bind:currentContent={currentContent.next} bind:leader bind:allAccounts/>
        {/if}
    </div>
{/if}
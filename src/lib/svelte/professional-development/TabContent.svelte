<script lang="ts">
	import Button from "../Button.svelte";
	import type { TabInterface } from "$lib/functions/tab-content";
	import ActiveTab from "./ActiveTab.svelte";
    import { addContent } from '$lib/functions/database';
    import { VIEW_CLIENT } from '$lib/functions/env';
    import { onMount } from 'svelte';
    import { addImageData, removeFile } from '$lib/functions/media';
    
    let { activeTab = $bindable(), tabContent = $bindable(), data, item = $bindable(), recentlyEdited = $bindable(), recentlySaved = $bindable(), allAccounts = $bindable() }: { activeTab: string, editable?: boolean, tabContent: TabInterface, data: Record<string, any>, item: Record<string, any>, recentlyEdited: boolean, recentlySaved: boolean, allAccounts: Array<string> } = $props()
    
	// const CurrentComponent = derived(activeTab, ($activeTab) => tabContent[$activeTab]);
    let initContent = $state(JSON.parse(JSON.stringify(tabContent))) // deep copy the initial tabContent
    let preSavedContent = $state(JSON.parse(JSON.stringify(tabContent))) // used for storing previously saved content

    let initItem = $state(JSON.parse(JSON.stringify(item))) // deep copy the initial item
    let preSavedItem = $state(JSON.parse(JSON.stringify(item))) // used for storing previously saved item

    let editable: boolean = $state(false);
    let saved: boolean = $state(false);
    let reverted: boolean = $state(false);
    let rawToken: any;
    let pendingDeletes: Set<string> = $state(new Set<string>());
    let selectedFiles: Map<string, File> = $state(new Map());

    async function toggleMode() {
        let hasUnsavedChanges = JSON.stringify(tabContent) !== JSON.stringify(initContent) || JSON.stringify(item) !== JSON.stringify(initItem);

        if (hasUnsavedChanges) {
            const confirmed = confirm('Unsaved changes will be lost if you turn off editor mode. Are you sure you want to proceed?');
            if (!confirmed) return;

            await callRevert();
            editable = false;
            localStorage.setItem('editor', 'false');
            return;
        }

        editable = !editable;
        localStorage.setItem('editor', editable.toString());
        recentlyEdited = false
        recentlySaved = false
    }

    onMount(() => {
        rawToken = VIEW_CLIENT;

        let savedEditorState = localStorage.getItem('editor');
        editable = savedEditorState === 'true';
    });

    const titleFolderPath = `module-${data.selectedItem.id}`;
    async function uploadFilesInContent(contentNode: any, title: string) {
        while (contentNode) {
            const isUploadType = ['image', 'video', 'pdf', 'csv'].includes(contentNode.type);
            const isObjectURL = typeof contentNode.content === 'string' && contentNode.content.startsWith('blob:');

            if (isUploadType && isObjectURL) {
                const previewUrl = contentNode.content;
                try {
                    const blob = await fetch(previewUrl).then(res => res.blob());
                    const mime = blob.type; 

                    type UploadType = 'image' | 'video' | 'pdf' | 'csv';
                    const extMap: Record<UploadType, string[]> = {
                        image: ['.jpg', '.jpeg', '.png', '.webp', '.gif'],
                        video: ['.mp4', '.mov', '.webm', '.avi'],
                        pdf: ['.pdf'],
                        csv: ['.csv']
                    };

                    const ext = extMap[contentNode.type as UploadType]?.[0] ?? '.bin';
                    const file = new File([blob], `${title}-${Date.now()}${ext}`, { type: mime }); 

                    const uploadedPath = await addImageData(file, titleFolderPath);

                    contentNode.content = uploadedPath;
                    URL.revokeObjectURL(previewUrl);
                } catch (err) {
                    console.error('Failed to upload from objectURL:', previewUrl, err);
                }
            }

            contentNode = contentNode.next;
        }
    }

	async function callAdd() {
        try {
            // Upload Blob Files
            await uploadFilesInContent(tabContent[activeTab]?.content, tabContent[activeTab]?.title);

            // Remove Files on Localstorage
            if (pendingDeletes.size > 0) {
                for (const path of pendingDeletes) {
                    try {
                        await removeFile(path, titleFolderPath);
                    } catch (err) {
                        console.error('Error deleting file on save:', err);
                    }
                }

                selectedFiles = new Map();
                pendingDeletes = new Set();
            }

            let result: {ok: true, result: any} | any = await addContent(rawToken, data.selectedItem, tabContent);

            if (!result) throw new Error('Error saving module content to database');
            if(result.ok) {
                saved = true;
                
                setTimeout(() => {
                    initContent = JSON.parse(JSON.stringify(tabContent))
                    preSavedContent = JSON.parse(JSON.stringify(tabContent))
                    initItem = JSON.parse(JSON.stringify(item))
                    preSavedItem = JSON.parse(JSON.stringify(item))
                    saved = false;
                    recentlyEdited = false
                    // recentlySaved = true
                }, 1000);

                return result;
            } 

        } catch(err) {
            console.error('Error:', err);
            alert('Error:' + err);
        }
	}

    async function callRevert() {
        try {
            let result: {ok: true, result: any} | any = await addContent(rawToken, data.selectedItem, preSavedContent);

            if (!result) throw new Error('Error reverting module content to database');

            if(result.ok) {
                reverted = true;
                tabContent = JSON.parse(JSON.stringify(preSavedContent));
                initContent = JSON.parse(JSON.stringify(preSavedContent))

                item = JSON.parse(JSON.stringify(preSavedItem))
                initItem = JSON.parse(JSON.stringify(preSavedItem))

                selectedFiles = new Map();
                pendingDeletes = new Set();

                setTimeout(() => {
                    reverted = false;
                    recentlySaved = false
                }, 1000);

                return result;
            }
        } catch(err) {
            console.error('Error:', err);
            alert('Error:' + err)
        }
    }

    let canEdit = data.user?.permission?.includes('can_edit');
    let moduleTitle = `module-${data.selectedItem.id}-` + data.selectedItem.title.toLowerCase().replace(' ', '-')
    let isFirstTime = $state(true);

    $effect(() => {
        if(activeTab == 'Personnel' && isFirstTime) {
            initContent = JSON.parse(JSON.stringify(tabContent))
            preSavedContent = JSON.parse(JSON.stringify(tabContent))
            isFirstTime = false
        }

        if(JSON.stringify(tabContent) != JSON.stringify(initContent) || JSON.stringify(item) != JSON.stringify(initItem)) recentlyEdited = true
        else recentlyEdited = false
    });

</script>

<div class="p-4 text-[15px] text-gray-800 leading-relaxed bg-[#F7F7F7]">

    <!-- Toggle Button -->
    <div class="{canEdit ? 'flex' : 'hidden'} flex-row-reverse w-full gap-2">
        <div class="flex w-full justify-between items-center px-2">
            <div class="flex items-center">
                <Button style="save-revert" onclick={callAdd} addStyle={recentlyEdited? 'opacity-100 shadow-lg w-[100px] static': 'opacity-0 w-0 absolute pointer-events-none'}>
                    <div class="w-full h-full flex items-center justify-center text-[8px] font-bold overflow-hidden whitespace-nowrap">
                        {saved ? 'SAVE SUCCESSFUL' : 'SAVE CHANGES'}
                    </div>
                </Button>
                <!-- <Button style="save-revert" onclick={callRevert} addStyle={recentlySaved? 'opacity-100 shadow-lg w-[100px]': 'opacity-0 w-0'}>
                    <div class="w-full h-full flex items-center justify-center text-[8px] font-bold overflow-hidden whitespace-nowrap">
                        {reverted ? 'REVERT SUCCESSFUL' : 'REVERT CHANGES'}
                    </div>
                </Button> -->
            </div>
            <div class="relative flex items-center w-22 h-5.5 px-1 rounded-full transition-colors duration-300 ease-in-out shadow-inner" class:bg-green-300={editable} class:bg-red-300={!editable}>
                <Button style="editor-mode" onclick={toggleMode} addStyle={editable? 'translate-x-4 bg-green-500 scale-100 shadow-lg': 'bg-red-500 scale-100 shadow-md'}>
                    <div class="w-full h-full flex items-center justify-center text-[8px] font-bold text-white">
                        {editable ? 'EDITOR ON' : 'EDITOR OFF'}
                    </div>
                </Button>
            </div>
        </div>

    </div>

    <div class="flex-row w-full text-sm bg-white p-6 rounded-lg border border-[#AFAFAF] shadow-md mt-5">
        <ActiveTab moduleTitle={moduleTitle} bind:allAccounts bind:leader={item.leader} bind:title={tabContent[activeTab].title} bind:content={tabContent[activeTab].content} bind:activeTab editable={editable} bind:initContent={initContent[activeTab].content} bind:pendingDeletes bind:selectedFile={selectedFiles}/>
    </div>
</div>
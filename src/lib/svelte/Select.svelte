<script lang="ts">
    let { style = 'default', options, selected = $bindable(), placeholder = '', addStyle = '', ...props } = $props()
    let styleValue = $state('')

    function onSelect() {
        console.log(this.options[this.selectedIndex].text)
    }

    $effect(() => {
        switch (style) {
            case 'modal':
                styleValue = 'transition-all duration-300 outline-none border-2 border-[#1B663E] shadow-[0px_4px_2px_0px_#1B663E] px-3 py-2 rounded text-sm text-black focus:translate-y-1 focus:shadow-[0px_2px_0px_0px_#1B663E]'
                break;
            case 'default':
                styleValue = 'flex w-48 p-0 bg-[#1B663E] focus:ring-0'
                break;
            default:
                styleValue = ''
                break;
        }
    })

</script>

<select class="{styleValue} {addStyle}" onselect={onSelect} {...props}>
    {#if !selected}
        <option value="" disabled selected>Select {placeholder}</option>
        {#each options as o}
            <option>{o}</option>
        {/each}
    {:else}
        {#each options as o}
            <option selected={o === selected}>{o}</option>
        {/each}
    {/if}
</select>

<style>
    select {
        appearance: none;
        /* display: none; */
    }

    option {
        border-radius: 0px;
        border: 2px solid;
        background-color: inherit;
    }
</style>
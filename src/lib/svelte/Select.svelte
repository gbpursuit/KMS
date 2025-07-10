<script lang="ts">
    let { style = 'default', options, selected = $bindable(), value = $bindable(), placeholder = '', addStyle = '', ...props } = $props()
    let styleValue = $state('')

    function onChange(this: { options: Record<any, any>, value: any }) {
        selected = this.options[this.options.selectedIndex].text
        value = parseInt(this.value)
    }

    $effect(() => {
        switch (style) {
            case 'modal':
                styleValue = 'transition-all duration-300 outline-none border-2 border-[#1B663E] shadow-[0px_4px_2px_0px_#1B663E] px-3 py-2 rounded text-sm text-black focus:translate-y-1 focus:shadow-[0px_2px_0px_0px_#1B663E]'
                break;
            case 'default':
                styleValue = 'flex w-48 p-0 bg-[#1B663E] focus:ring-0'
                break;
            case 'evaluation':
                styleValue = 'w-64 py-2 px-3 rounded-xl bg-white text-black border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-green-600 appearance-none';
                break; 
            case 'module-select':
                styleValue = 'w-full bg-white font-exo font-regular px-2 rounded-lg border-0'
                break;
            case 'modal-select':
                styleValue = 'text-sm py-3 px-3 w-[120px] border border-[var(--font-green)] rounded-full text-[var(--font-green)] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--font-green)] transition duration-200'
                break;
            default:
                styleValue = ''
                break;
        }
    })

</script>

<select class="{styleValue} {addStyle}" onchange={onChange} bind:value={value} {...props}>
    <option value="" disabled selected={!selected && !value} hidden={selected || value}>Select {placeholder}</option>
    {#each options as o, i}
        <option value={i+1} selected={o == selected || (i+1) == value}>{o}</option>
    {/each}
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
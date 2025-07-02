<script lang="ts">
    let { style = 'default', options = $bindable(), selected = $bindable(), addStyle = '', ...props } = $props()
    let styleValue = $state('')

    switch (style) {
        case 'default':
            styleValue = 'flex w-48 p-0 bg-transparent focus:ring-0'
            break;
        default:
            styleValue = ''
            break;
    }

</script>

<select class="{styleValue} {addStyle}" {...props}>
    {#each options as o}
        <option selected={o === selected} class="bg-[#1B663E] field-sizing-content" contenteditable="true">{o}</option>
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
    }
</style>
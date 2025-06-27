<script lang="ts">
    let { style = '', addStyle = '', type = 'button', children, ...props } = $props()

    let styleValue = $state('')
    type ButtonType = 'button' | 'submit' | 'reset' | null | undefined

    function toButtonType(b: string) {
        let val: ButtonType = undefined
        switch(b) {
            case 'button':
                val = 'button'
                break;
            case 'submit':
                val = 'submit'
                break;
            case 'reset':
                val = 'reset'
                break;
            case '':
                val = null
                break;
            default:
                break;
        }
        return val
    }

    switch(style) {
        case 'submit':
            styleValue = 'w-full bg-[#185A37] text-white rounded-xl p-2 transition duration-300 ease-in-out hover:bg-[#146e47] hover:scale-[1.01]'
            break;
        case 'tab':
            styleValue = "font-exo flex-1 flex justify-center items-center px-4 py-3 text-sm transition-colors duration-300 ease-in-out font-semibold"
            break;
        case 'editor-mode':
            styleValue = "aspect-square w-4 rounded-xl transition duration-500 ease-in-out"
            break;
        case 'add-item':
            styleValue = "p-2 bg-transparent border-dashed border-2 rounded-xl"
            break;
        default:
            break;
    }

</script>

<button type={toButtonType(type)} class="{styleValue} {addStyle}" {...props}>
    {@render children()}
</button>
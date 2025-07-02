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
            styleValue = "w-16 h-4 rounded-xl transition duration-500 ease-in-out"
            break;
        case 'add-item':
            styleValue = "p-2 bg-transparent border-dashed border-2 rounded-xl"
            break;
        case 'make-admin':
            styleValue = "px-3 py-1 text-sm rounded bg-[#1B663E] text-white hover:bg-[#155b32] transition flex items-center justify-center gap-2"
            break;
        case 'make-user':
            styleValue = "px-3 py-1 text-sm rounded bg-gray-300 text-black hover:bg-gray-400 transition flex items-center justify-center gap-2"
            break;
        case 'remove':
            styleValue = "px-3 py-2 text-sm rounded bg-[#800000] text-white hover:bg-[#a00000] transition flex items-center justify-center"
            break;
        case 'underline':
            styleValue = "text-sm text-[#1B663E] underline ml-auto hover:text-green-800"
            break;
        default:
            break;
    }

</script>

<button type={toButtonType(type)} class="{styleValue} {addStyle}" {...props}>
    {@render children()}
</button>
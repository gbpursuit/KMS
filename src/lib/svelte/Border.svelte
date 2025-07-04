<script lang="ts">

    let { style = $bindable(), uploadProgress = $bindable(), isError = $bindable(), addStyle = '', ...props } = $props()
    let viewBox = $state('');
    let styleValue = $state('');
    let stroke = $state('');
    let dashArrayDash = $state('');
    let radius = $state('');
    let vector = $state('');
    let fill = $state('');
    let rectWidth = $state('');
    let rectHeight = $state('');
    let dashArraySolid = $state(0);

    $effect(() => {
		switch (style) {
			case 'upload':
                viewBox = '0 0 1000 125';
                styleValue = 'w-full h-[125px] pointer-events-none';
                stroke = isError ? '#fb2c36' : '#1B663E';
                dashArrayDash = "6 3";
                radius = "12";
                vector = "non-scaling-stroke";
                fill = "none";
                rectWidth = '998';
			    rectHeight = '123';
                dashArraySolid = 2 * (parseInt(rectWidth) + parseInt(rectHeight));
                break;
			default:
				break;
		}
    })

</script>

<!-- 
Pwede ibahin ung value ng x, y, and stroke-width but next time na 
since ang clunky tignan (inset)
-->
<svg
    viewBox={viewBox}
    preserveAspectRatio="none"
    class="absolute inset-0 z-1 {styleValue}"
>
    <rect
        x="1" y="1" width={rectWidth} height={rectHeight}
        fill={fill}
        stroke={stroke}
        stroke-width="2"
        stroke-dasharray={dashArrayDash}
        rx={radius} ry={radius} 
        vector-effect={vector}
    />

    <rect
        x="1" y="1" width={rectWidth} height={rectHeight}
        fill={fill}
        stroke={stroke}
        stroke-width="2"
        stroke-dasharray={`${dashArraySolid}`}
        stroke-dashoffset={dashArraySolid - (uploadProgress / 100) * dashArraySolid}
        pathLength={`${dashArraySolid}`}
        style="transition: stroke-dashoffset 0.3s ease"
        rx={radius} ry={radius}
        vector-effect={vector}
    />
</svg>
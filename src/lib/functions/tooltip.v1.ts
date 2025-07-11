export function tooltip(element: HTMLElement) {
	let div: HTMLDivElement | null = null;
	const title = element.getAttribute('title');

	if (title) element.removeAttribute('title');

	const createTooltip = (x: number, y: number) => {
		div = document.createElement('div');
		div.textContent = title ?? '';
		Object.assign(div.style, baseStyle, {
			left: `${x + 5}px`,
			top: `${y + 5}px`,
		});
		document.body.appendChild(div);
	};

	const updateTooltipPosition = (x: number, y: number) => {
		if (div) {
			div.style.left = `${x + 5}px`;
			div.style.top = `${y + 5}px`;
		}
	};

	const removeTooltip = () => {
		if (div && div.parentNode) {
			div.parentNode.removeChild(div);
			div = null;
		}
	};

	function mouseOver(e: MouseEvent) {
		if (!title) return;
		removeTooltip();
		createTooltip(e.pageX, e.pageY);
	}

	function mouseMove(e: MouseEvent) {
		updateTooltipPosition(e.pageX, e.pageY);
	}

	function mouseLeave() {
		removeTooltip();
	}

	element.addEventListener('mouseover', mouseOver);
	element.addEventListener('mousemove', mouseMove);
	element.addEventListener('mouseleave', mouseLeave);

	return {
		destroy() {
			element.removeEventListener('mouseover', mouseOver);
			element.removeEventListener('mousemove', mouseMove);
			element.removeEventListener('mouseleave', mouseLeave);
			removeTooltip();
		}
	};
}

const baseStyle: Partial<CSSStyleDeclaration> = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center',
	position: 'absolute',
	color: '#fff',
	fontSize: '12px',
	border: '1px solid #ddd',
	boxShadow: '1px 1px 1px #ddd',
	background: '#333',
	borderRadius: '4px',
	padding: '6px 10px',
	zIndex: '9999',
	pointerEvents: 'none',
	whiteSpace: 'pre',
};

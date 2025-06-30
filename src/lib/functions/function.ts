export function smoothScrollTo(targetId:string, baseSpeed = 0.5) {
    const target = document.getElementById(targetId) as HTMLElement || null; 

    if (window.innerWidth < 480) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
    }

	const topbar = document.getElementById('topbar');
	const offset = topbar?.offsetHeight ?? 0;

    const start = window.scrollY; 
    const end = target.getBoundingClientRect().top + start - offset;
    const change = end - start; 
    const distance = Math.abs(change);
    const duration = Math.min(1500, Math.max(300, distance * baseSpeed));

    const startTime = performance.now(); 
    
    function animateScroll(currentTime:number) {
        const elapsed = currentTime - startTime; 
        const progress = Math.min(elapsed / duration, 1); 
        window.scrollTo(0, start + change * ease(progress));
        if (progress < 1) requestAnimationFrame(animateScroll); 
    }

    function ease(t:number) {
        return 1 - Math.pow(1 - t, 3);
    }
    requestAnimationFrame(animateScroll); 
}


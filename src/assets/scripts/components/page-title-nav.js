export default function pageTitleNav(gsap) {
    const container = document.querySelector('.page-title-nav');
    if (!container || !gsap) return;
    gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: '100% top',
            end: '120% top',
            scrub: false,
            onLeave: () => {
                container.classList.add('fixed');
            },
            onEnterBack: () => {
                container.classList.remove('fixed');
            },
            // markers: true,
        }
    })
        // .to(container, {
        //     // transformOrigin: 'right',
        //     rotate: 0,
        //     y: 0
        // })
}
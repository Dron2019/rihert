export default function pageTitleNav(gsap) {
    const container = document.querySelector('.page-title-nav');
    if (!container || !gsap) return;
    gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: document.documentElement.classList.contains('mobile') ? '50px top' : '40% top',
            end: document.documentElement.classList.contains('mobile') ? '60px top' : '50% top',
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
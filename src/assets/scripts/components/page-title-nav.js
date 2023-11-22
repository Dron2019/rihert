export default function pageTitleNav(gsap) {
    const container = document.querySelector('.page-title-nav');
    if (!container || !gsap) return;
    gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: '100% top',
            end: '150% top',
            scrub: true,
            // markers: true,
        }
    })
        .to(container, {
            transformOrigin: 'right',
            rotate: 0,
            y: 0
        })
}
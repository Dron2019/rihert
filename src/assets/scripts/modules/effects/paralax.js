const transformationValues = (type) => {
    switch (type) {
        case 'tablet':
            return {
                from: {
                    y: -10,
                }, 
                to: {
                    y: 0,
                }
            }
        case 'mobile':
            return {
                from: {
                    y: -50,
                }, 
                to: {
                    y: 50,
                }
            }
    
        default:
            return {
                from: {}, 
                to: {}
            }
    }
}


export function paralaxesScreens(deviceType1 = 'desktop', gsap) {

    let deviceType = deviceType1;
    if (document.documentElement.classList.contains('tablet')) {
        deviceType = 'tablet';
    }
    if (document.documentElement.classList.contains('mobile')) {
        deviceType = 'mobile';
    }


    document.querySelectorAll('.paralax-screen').forEach(el => {

        gsap.timeline({
            defaults: {
                force3D: true,
                ease: 'none'
            },
            scrollTrigger: {
                trigger: el,
                scrub: true,
            }
            
        })
            .fromTo(el.querySelector('.paralax-screen-wrapper-transform'), {
                y: -100,
                ...transformationValues(deviceType).from
            }, {
                y: 100,
                ...transformationValues(deviceType).to
            })
            .fromTo(el.querySelector('.paralax-screen-wrapper-scale'), {
                scale: 1.2
            }, {
                scale: 1
            }, '<');
    })
}
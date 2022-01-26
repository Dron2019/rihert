import gsap from 'gsap';
export default function screen9Handler() {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const $li = document.querySelectorAll('.screen9 [data-src]');
    // const elToChangeSrc = isMobile ? 
    //     document.querySelector('.screen9-switcher-mob img') :
    //     document.querySelector('.screen9-switcher img');
    const elToChangeSrc =document.querySelector('.screen9-switcher img');
    const elMobToChangeSrc = document.querySelector('.screen9-switcher-mob img');
    let inProgress = false;

    $li.forEach(legendItem => {
        legendItem.addEventListener('mouseenter', () => {
            
            gsap.timeline().add(() => {
                elToChangeSrc.src = legendItem.dataset.src;
                elMobToChangeSrc.src = legendItem.dataset.src;
                if (inProgress === false) {
                    inProgress = true;
                    // elToChangeSrc.parentElement.classList.add('opened');
                }
            })
            .add(() => {
                if (inProgress === true) return;
                // elToChangeSrc.parentElement.classList.add('closing');
                // elToChangeSrc.parentElement.classList.remove('opened');
            },'<+0.5')
            .add(() => {
                if (inProgress === true) return;
                // elToChangeSrc.parentElement.classList.remove('closing');
                
            },'<+0.5')
            .add(el => inProgress = false, '<+0.5')
            
        })
    });


    const $videos = document.querySelectorAll('.map-part');
    $videos.forEach(part => {
        const video = part.querySelector('video');
        part.addEventListener('mouseenter', () => video.play())
        part.addEventListener('mouseleave', () => video.load())
    })
}



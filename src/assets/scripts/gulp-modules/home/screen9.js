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
        const clodeVideo = createCloneVideo(video);
        part.addEventListener('mouseenter', () => {
            // video.play();

            if (!isMobile) {

                clodeVideo.style.top = video.getBoundingClientRect().top+'px';
                clodeVideo.style.left = video.getBoundingClientRect().left+'px';
                clodeVideo.style.width = video.getBoundingClientRect().width+'px';
                clodeVideo.style.height = video.getBoundingClientRect().height+'px';
                document.body.append(clodeVideo);
                clodeVideo.play();
            } else {
                video.play();
            }
            
        })
        part.addEventListener('mouseleave', () => {
            // video.load();
            if (!isMobile) {
                clodeVideo.remove();
                clodeVideo.load();
            } else {
                video.load();
            }
        })
    })
}

function createCloneVideo(video) {
    const el = video.cloneNode(true);
    const { width, height, x, y } = video.getBoundingClientRect();
    el.style.cssText = `
        width: ${width}px;
        height: ${height}px;
        position: fixed;
        left: ${x}px;
        top: 50%;
        pointer-events: none;
        object-fit:cover;
        top: ${y}%
    `;
    return el;
}

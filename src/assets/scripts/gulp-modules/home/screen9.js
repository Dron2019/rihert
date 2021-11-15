import gsap from 'gsap';
export default function screen9Handler() {
    const $li = document.querySelectorAll('.screen9 [data-src]');
    const elToChangeSrc = document.querySelector('.screen9-switcher img');
    let inProgress = false;

    $li.forEach(legendItem => {
        legendItem.addEventListener('mouseenter', () => {
            
            gsap.timeline().add(() => {
                elToChangeSrc.src = legendItem.dataset.src;
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
    })
}
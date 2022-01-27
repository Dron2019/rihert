import {gsap, ScrollTrigger} from 'gsap/all';
import { param } from 'jquery';
// import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

import screen9Handler from './home/screen9';
import headerHandle from './home/header';
import { fromPathToArray, isFullHd, debounce } from '../modules/helpers/helpers';

global.gsap = gsap;
gsap.core.globals("ScrollTrigger", ScrollTrigger);


window.addEventListener('load', init);


const isMobile = () => window.matchMedia('(max-width: 575px)').matches;
const isTablet = () => window.matchMedia('(max-width: 1024px)').matches;
gsap.defaults({
  // ease: 'power3.out',
  duration: 2.5,
});



gsap.registerPlugin(ScrollTrigger);

function init() {
  headerHandle();


const pageContainer = document.querySelector(".scroller-container");

/* SMOOTH SCROLL */
const scroller = new LocomotiveScroll({
  el: pageContainer,
  smooth: true,
  smoothMobile: false,
  // inertia: 1.1,
  multiplier: 0.5,
  lerp: 0.05,
});
window.scroller = scroller;
scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(pageContainer, {
  scrollTop(value) {
    return arguments.length
      ? scroller.scrollTo(value, 0, 0)
      : scroller.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: document.querySelector('[data-scroll-section]').style.transform ? "transform" : "fixed"
});


window.ttl1 = !isTablet() && gsap.timeline({
  ease: 'none',
  scrollTrigger: {
    scroller: pageContainer,
    trigger: '.screen1',
    scrub: true,
    pin: '.screen1__inner',
    end: '100% bottom',
    // onEnter: () => gsap.set('.screen1__inner', { willChange: 'transform' }),
    // onEnterBack: () => gsap.set('.screen1__inner', { willChange: 'transform' }),
    // onLeaveBack: () => gsap.set('.screen1__inner', { willChange: '' }),
    // onLeave: () => gsap.set('.screen1__inner', { willChange: '' }),
  }
})
// .to('.screen1__inner .h1', {  z: 10, duration: 0.5 })
.to('.screen1__inner', {scale: 2.5, transformOrigin: '100% 100%', ease: 'none',} )



const screen9 = document.querySelector('.screen9 .screen9__inner');
// 0.28
const mapRatio = innerWidth / document.querySelector('.map').getBoundingClientRect().width;
!isTablet() && gsap.set(screen9, { scale: mapRatio, transformOrigin: 'top left' })

ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll
ScrollTrigger.refresh();



screen9Handler();

const frames = [
  undefined, 
  document.querySelector('[data-frame="1"]'),
  document.querySelector('[data-frame="2"]'),
  document.querySelector('[data-frame="3"]'),
  document.querySelector('[data-frame="4"]'),
  document.querySelector('[data-frame="5"]'),
];

const tl8IsMobile = isMobile();
function adaptiveScreen8Values(mobile, desktop) {
  if (isMobile()) return mobile;
  return desktop;
}
window.ttl8 = gsap.timeline( {
  defaults: {
    ease: 'none'
  },
  scrollTrigger: {
    scroller: pageContainer, //locomotive-scroll
    scrub: 1,
    trigger: ".screen8",
    pin: ".screen8__inner",
    start: "top top",
    end: `bottom ${window.innerHeight}px`,
  },
  ease: "none"
})
// frame 1
.set(frames[1], { zIndex: 10 })
.to(frames[1], { 
  // scale: 1.7, 
  yPercent: tl8IsMobile ? 60 : -20,
  xPercent: tl8IsMobile ? -50 : null,
  // top: tl8IsMobile ? null : '26%',
  scale: tl8IsMobile ? 2.08 : 1.45,
})
.to('[data-frame="1-1"]', { autoAlpha: 1, duration: 0.35 }, '<')
.to(frames[5], {
  xPercent: 100, 
  yPercent: 15, 
  scale: 0.75
},'<')
.to(frames[4], {
  xPercent: tl8IsMobile ? null : 75,
  yPercent: tl8IsMobile ? null : 75, 
  scale: tl8IsMobile ? 0.65 :0.75,
  // transformOrigin: '100% 0',
},'<')
.to(frames[2], {
  yPercent: 0,
  xPercent: tl8IsMobile ? null : 32,
  scale: tl8IsMobile ? 1 : 1 / 1.5
},'<')
.to(frames[3], {
  yPercent: tl8IsMobile ? 8 : 0,
  xPercent: tl8IsMobile ? -32 : -55,
  scale: tl8IsMobile ? 0.36 : 1 / 1.87
},'<')
.addLabel('frame1')



// frame 2
.to(frames[2], { 
  // scale: tl8IsMobile ? 2.85 :  1 / 0.49,
  scale: tl8IsMobile ? 2.85 :  1 / 0.51,
  xPercent: 170,
  yPercent: -100,
  // top: '50%'
}, '+=1')
.to('[data-frame="1-1"]', { autoAlpha: 0, duration: 0.35 }, '<')
.to(frames[1], { 
  scale: 1 / 2.3, 
  xPercent: tl8IsMobile ? 0 : 62, 
  yPercent: tl8IsMobile ? -140 : -50,
}, '<')
.to(frames[5], { 
  scale: tl8IsMobile ? 0.64 : 1 / 1.49, 
  yPercent: tl8IsMobile ? 40 : 0,
  xPercent: tl8IsMobile ? -108 : -100, 
}, '<')
.to(frames[4], { 
  scale: 1 / 1.4, 
  xPercent: tl8IsMobile ? -15 : 100, 
  yPercent: tl8IsMobile ?  70 : 108,
}, '<')
.to(frames[3], { 
  xPercent: tl8IsMobile ? 30 : -135,
}, '<')
.to('[data-frame="1-2"]', { autoAlpha: 1, duration: 0.35 } )
.addLabel('frame2')
// frame 3

.to(frames[3], { 
  scale: tl8IsMobile ? 1.4 : 1 / 0.37,
  xPercent: tl8IsMobile ? -15 : -262,
  yPercent: tl8IsMobile ? -107 : -115
}, '+=1')

.to('[data-frame="1-2"]', { autoAlpha: 0, duration: 0.35 }, '<')
.to(frames[2], { 
  scale: tl8IsMobile ? 1 : 1 / 1.38,
  // x: 0,
  // y: 0,
  xPercent: tl8IsMobile ? -100 : 60,
  yPercent: tl8IsMobile ? 102 : 0,
}, '<')
.to(frames[1], { 
  xPercent: tl8IsMobile ? -16 : 83,
  yPercent: tl8IsMobile ? -232 : -140,
}, '<')
.to(frames[4], { 
  xPercent: tl8IsMobile ? 81 :  100,
  yPercent: tl8IsMobile ? 88 :  100,
  scale: tl8IsMobile ? 0.79 : 1/2.04,
}, '<')

.to(frames[5], { 
  xPercent: tl8IsMobile ? -180 : -100,
  yPercent: tl8IsMobile ? 40  : -70,
  scale: tl8IsMobile ? 0.8 : 1/0.83,
}, '<')
.to('[data-frame="1-3"]', { autoAlpha: 1, duration: 0.35 } )
//translate(-180%, 40%) scale(0.8)

.addLabel('frame3')
// frame 4
.to(frames[1], { 
  yPercent: adaptiveScreen8Values(-236,-100),
  scale: adaptiveScreen8Values(0.44, 1/2.94),
}, '+=1')
//-6%, -236%
.to('[data-frame="1-3"]', { autoAlpha: 0, duration: 0.15 }, '<' )
.to(frames[3], { 
  yPercent: adaptiveScreen8Values(9, -100 ),
  xPercent: adaptiveScreen8Values(39, -40),
  scale: adaptiveScreen8Values(0.38, 0.98),
}, '<')
//translate(39%, 9%) scale(0.38);
.to(frames[4], { 
  xPercent: 245,
  yPercent: 75,
  scale: tl8IsMobile ? 3.09 : 1 / 0.5,
}, '<')
.to(frames[2], { 
  xPercent: adaptiveScreen8Values(-114, 0),
  yPercent: adaptiveScreen8Values(160,0),
  scale: adaptiveScreen8Values( 0.5, 1 / 1.39),
  // transformOrigin: '0 0', 
}, '<')
.to(frames[5], { 
  xPercent: adaptiveScreen8Values(-177, -100),
  yPercent: adaptiveScreen8Values(88,-70),
  scale: 1 / 1.39,
}, '<')
//translate(-177%, 88%) scale(0.7194, 0.719424)
.to('[data-frame="1-4"]', { autoAlpha: 1, duration: 0.15 })
.addLabel('frame4');



!isTablet() && gsap.timeline({
  ease: 'none',
  scrollTrigger:  {
    scrub: true,
    scroller: pageContainer,
    trigger: ".screen7",
    end: `${innerHeight} bottom`,
    onEnter: () => {
      gsap.set('.screen7__inner', { willChange: 'transform' })
    },
    onEnterBack: () => {
      gsap.set('.screen7__inner', { willChange: 'transform' })
    },
    onLeave: () => {
      gsap.set('.screen7__inner', { willChange: 'auto' })
    },
    onLeaveBack: () => {
      gsap.set('.screen7__inner', { willChange: 'auto' })
    },
  }
})
.fromTo('.screen5__inner', 
{scale: 1},
{ 
  // x: innerHeight / -1,
  scale: 0.5,
  transformOrigin: '0 100%',
  // duration: 5
})
.from('.screen7__inner', { 
  // yPercent: -30, 
  xPercent: 70, 
  z: 0,
  // scale: 3, 
  transformOrigin: '0 0', 
  ease: 'none' 
}, '<')


!isTablet() && gsap.timeline({
  ease: 'none',
  scrollTrigger:  {
    scrub: true,
    scroller: pageContainer,
    trigger: ".screen10",
    start: "100% bottom",
    end: '+=300px top',
    onEnter: () => {
      scroller.update();
      console.log('enter 10');
    }
  }
})

.to('.screen10__inner-right-content', { x: (e, target) => {
  return target.getBoundingClientRect().left * -1;
}}, '<')
.to('.right-bg', { width: '100vw'}, '<')


// startCustomScroll()

const screen5 = document.querySelector('.screen5');
const screen5Inner = document.querySelector('.screen5__inner');
const screen5ScaleCoef = innerHeight / document.querySelector('.screen5-grid-2-1').getBoundingClientRect().height;
function setScreen5Height() {
  !isTablet() && screen5.style.setProperty('--screen5-height', innerWidth * screen5ScaleCoef + screen5Inner.getBoundingClientRect().height + 'px')
}
setScreen5Height();
function get5ScreenTl() {
  return gsap.timeline( {
    defaults: {
      transformOrigin: '50% 50%',
      ease: 'none'
    },
    scrollTrigger: {
      scroller: pageContainer, //locomotive-scroll
      scrub: 1,
      trigger: screen5,
      pin: screen5Inner,
      end: `${innerWidth * screen5ScaleCoef} top`,
      markers: false,
      start: "top top",
    },
    ease: "none"
  })
  .to(screen5Inner, { scale: screen5ScaleCoef, transformOrigin: '0 0', duration: 0 })
  .to(screen5Inner, 
  {
    // x: innerHeight  * -screen5ScaleCoef,
    x: screen5.getBoundingClientRect().width * -screen5ScaleCoef + innerWidth,
    z: 0,
    transformOrigin: '0 0',
  }, '<')
  .to(screen5Inner, { scale: 1, transformOrigin: '0 0', duration: 0.3, x: 0 })
}

function refreshScr5() {
  location.reload();
}
const refreshSCr5Debounced = debounce(refreshScr5, 1000);
window.tlscr5 = !isTablet() && get5ScreenTl();
window.addEventListener('resize',function(evt){
  // refreshSCr5Debounced();

});


  const inner5Mobile = '.screen5__inner-mobile';
  isMobile() && gsap.timeline({
    ease: "none",
    scrollTrigger: {
      scroller: pageContainer,
      trigger: '.screen5',
      end: `100% bottom`,
      markers: false,
      scrub: 1,
      pin: inner5Mobile,
      start: "top top",
    }
  })
  .to(inner5Mobile, {
    // scale: 1,
    xPercent: -45,
    yPercent: -16.6,
    transformOrigin: '0 0',
    ease: 'none',
    // duration: 0.75,
  })
  .to(inner5Mobile, {
    // scale: 1,
    xPercent: 0,
    yPercent: -36.8,
    transformOrigin: '0 0',
    ease: 'none',
    // duration: 0.75,
  })
  .to(inner5Mobile, {
    scale: 0.5,
    yPercent: -70,
    xPercent: 0,
    transformOrigin: '0 100%',
    ease: 'none',
  })



  !isTablet() && gsap.timeline({
    ease: "none",
    force3D: false,
    scrollTrigger: {
      scroller: pageContainer,
      trigger: '.screen9',
      start: 'top top',
      end: `100% bottom`,
      force3D: false,
      // markers: false,
      scrub: 1,
      pin: '.screen9__inner',
      start: "top top",
      onLeave: () => {
        scroller.update();
      }
    }
  })
  .to('.screen9__inner', {
    scale: 1,
    force3D: false,
  })


  function curtainOpen() {
    gsap.timeline()
      .set('.curtain', { display: 'flex' })
      .fromTo('.curtain', { xPercent: 100 }, { xPercent: 0, duration: 0.75, ease: 'power2.out' })
  }
  function curtainClose() {
    gsap.timeline()
      .to('.curtain', { xPercent: -100, duration: 0.75, ease: 'power2.out' })
      .set('.curtain', { display: 'none' })
  }


  document.querySelectorAll('.nav__link').forEach(el => {
    if (isTablet()) return;
    el.addEventListener('click',function(evt){
      evt.preventDefault();
      gsap.timeline()
        .add(curtainOpen)
        .set('body', { cursor: 'progress' }, '<')
        .add(() => {
          if (isTablet()) return;
          scroller.scrollTo(document.querySelector(el.getAttribute('href')))
        }, '<+1.5')
        .add(curtainClose, '<+1.5')
        .set('body', { cursor: '' }, '<')
    });
  })
  window.curtainOpen = curtainOpen;
  window.curtainClose = curtainClose;
  /**УПРАВЛЕНИЕ СКРОЛЛОМ */

  function sectionFrames() {
    const screens = document.querySelectorAll('.screen:not(.screen6)');
    const defaultFrames = getScreenFrames();
    const separationOfFrames = [
      /*1*/ [0.55],
      /*2*/ [],
      /*3*/ [0.35, 0.54, 0.64,0.74, 0.8],
      /*4*/ [],
      /*5*/ [0.2,0.4,0.6,0.8],
      /*6*/ [0.5],
      /*7*/ [0.55],
      /*8*/ [],
      /*9*/ [],
      /*10*/ [],
      /*11*/ [],
    ]
    
    const framesWithSeparation = [];
    defaultFrames.forEach((frame, index) => {
      framesWithSeparation.push(defaultFrames[index]);
      console.log(screens[index], defaultFrames);
      if (screens[index]) {
        screens[index].dataset.positionIndex = framesWithSeparation.indexOf(defaultFrames[index]);
      }
      if (index === defaultFrames.length - 1) return;

      /**Формирование точек останова внутри секции */
      separationOfFrames[index].forEach(innerFrame => {
        // console.log(innerFrame);
        const rangeBetweenFrames = gsap.utils.mapRange(0,1,defaultFrames[index], defaultFrames[index + 1], innerFrame);
        framesWithSeparation.push(rangeBetweenFrames);
      })
    })
    console.log(defaultFrames);
    console.log(framesWithSeparation);
    let CURRENT_FRAME = 0;
    let isAnimating = false;
    window.scroller.stop();

    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click',function({target}){
        const newIndexForScrollFrames = document.querySelector(target.getAttribute('href')).dataset.positionIndex;
        console.log(newIndexForScrollFrames);
        CURRENT_FRAME = +newIndexForScrollFrames;
      });
    })
    window.addEventListener('wheel',function(evt){
      console.log(CURRENT_FRAME);
      if (isAnimating) return;
      
      const direction = evt.deltaY > 0 ? 
        Math.min(CURRENT_FRAME + 1, framesWithSeparation.length - 1) : 
        Math.max(CURRENT_FRAME - 1, 0);

      CURRENT_FRAME = direction === 0 ? 0 : direction;
      if (typeof framesWithSeparation[direction] === 'number') {
        isAnimating = true;
        window.scroller.scrollTo(framesWithSeparation[direction],  {
          callback: () => isAnimating = false,
          easing: [0.25,0.5,0.75,1.00],
          duration: 1500
        });
      }
      // console.log(defaultFrames[direction]);


    });
  }

  function getScreenFrames() {
    const screens = document.querySelectorAll('.screen:not(.screen6)');
    let preHeightAccumulator = 0;
    const frames = Array.from(screens).reduce((acc,el, index) => {

      console.log(el.getBoundingClientRect().height);
      // const prevSum = acc.reduce((acc1, el) => {
        //   acc1 += el;
        //   return acc1
        // }, 0);
        // // acc.push(el.getBoundingClientRect().height + prevSum);
        el.dataset.position = el.getBoundingClientRect().height + preHeightAccumulator;
        acc.push(el.getBoundingClientRect().height + preHeightAccumulator);
        preHeightAccumulator += el.getBoundingClientRect().height;
      return acc;
    }, []);
    frames.splice(0, 0, 0);

    return frames;
  }
  sectionFrames();
    /**УПРАВЛЕНИЕ СКРОЛЛОМ */
}


import {gsap, ScrollTrigger} from 'gsap/all';
import { param } from 'jquery';
// import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

import screen9Handler from './home/screen9';
import headerHandle from './home/header';
import { fromPathToArray, isFullHd } from '../modules/helpers/helpers';

global.gsap = gsap;
const isMobile = () => window.matchMedia('(max-width: 575px)').matches;
const isTablet = () => window.matchMedia('(max-width: 1024px)').matches;
gsap.defaults({
  ease: 'power3.out',
  duration: 2.5,
})
gsap.registerPlugin(ScrollTrigger);

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


!isMobile() && gsap.timeline({
  scrollTrigger: {
    scroller: pageContainer,
    trigger: '.screen1',
    scrub: true,
    pin: '.screen1__inner',
    end: '100% bottom',
  }
})
.to('.screen1__inner', {scale: 2.5, transformOrigin: '100% 100%'} )

gsap.timeline({
  scrollTrigger: {
    trigger: '.screen2',
    scroller: pageContainer,
    start: '-20px bottom',
    ease: 'none',
    onEnter: () => {
      console.log('d');
      gsap.timeline()
        .add(stopCustomScroll)
        // .to('.screen1', { scale: 2.5 })
        .add(() => {
          // scroller.scrollTo(document.querySelector('.screen2'))
        })
        .add(startCustomScroll, '+0.5')
    },
  }
})


function stopCustomScroll() {
  scroller.stop();
}
function startCustomScroll() {
  scroller.start();
}



!isMobile() && gsap.timeline({
  scrollTrigger: {
    scroller: pageContainer,
    trigger: '.screen10',
    scrub: true,
    onEnter: () => {
      // params[11]()
      console.log('enter 11');
    },
    onEnterBack: () => {
      // console.log('enter back 9');
      params[10]('fromBack')

    }
  }
})
!isMobile() &&  gsap.timeline({
  scrollTrigger: {
    scroller: pageContainer,
    trigger: '.screen11',
    scrub: true,
    onEnter: () => {
      params[11]()
      console.log('enter 11');
    },
    onEnterBack: () => {
      console.log('enter back 9');
      // params[9]('fromBack')

    }
  }
})


const screen9 = document.querySelector('.screen9 .screen9__inner');
// 0.28
!isTablet() && gsap.set(screen9, { scale: 3.4, transformOrigin: 'top left' })

ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll
ScrollTrigger.refresh();

// stopCustomScroll();

/**
 * Анимация срабатывает когда попадаешь на этот номер экрана
 * Номер экрана изменяется на некоторых экранах по скроллу
 * если экран с прокруткой, для смены используется скролл триггер
 * изменения номер текущего экрана в самой функции, вне нее идет только ее вызов с параметром номера экрана
 */
const params = {
  excludeScreenOnScrollChange: [1, 2,3,5, 6,7, 10, 11],
  currentScreen: '1',
  isAnimating: false,
  2: () => {},
  3: () => {},
  4: () => {},
  5: () => {},
  6: () => {},
  7: () => {},
  8: () => {},
  9: (fromBack) => {},
  10: () => {
    gsap.timeline({ paused: true })
      .add(() => {
        stopCustomScroll();
        params.isAnimating = true;
        scroller.scrollTo(document.querySelector('.screen10'));
      })
      .add(() => {
        params.isAnimating = false;
        params.currentScreen = 10;
        startCustomScroll();
      }, '<+1.2').play();
  },
  11: () => {
    let isAnimating = true;
    let currentState = 1;
    window.addEventListener('wheel',handlerScreen11);
    function handlerScreen11({ deltaY }) {  
      if (isAnimating === true) return;
      if (deltaY > 0 && currentState === 1) {
        // currentState = 2;
        switchState1To2().play();
      } else if (deltaY < 0 && currentState === 1) {
        leaveBack().play();
      } else if (deltaY < 0 && currentState === 2) {
        switchState2To1().play();
      }
    }
    function leaveBack() {
      return gsap.timeline({ paused: true })
        .add(() => {
          isAnimating = true;
          scroller.scrollTo(document.querySelector('.screen10'));
        })
        // .to('.screen11 img', { scale: 1.5 })
        .add(() => {
          currentState = 1;
        })
        .add(() => {
          isAnimating = false;
          params.currentScreen = 10;
          window.removeEventListener('wheel',handlerScreen11);
        })
    }
    function switchState1To2(){
      return gsap.timeline({ paused: true })
        .add(() => isAnimating = true)
        .to('.screen11', { scale: 1.3 })
        .add(() => {
          currentState = 2;
        })
        .add(() => isAnimating = false)
    }
    function switchState2To1(){
      return gsap.timeline({ paused: true })
        .add(() => isAnimating = true)
        .to('.screen11', { scale: 1 })
        .add(() => {
          currentState = 1;
        })
        .add(() => isAnimating = false)
    }

    gsap.timeline({ paused: true })
      .add(() => {
        stopCustomScroll();
        params.isAnimating = true;
        scroller.scrollTo(document.querySelector('.screen11'));
      })
      .add(() => {
        params.isAnimating = false;
        params.currentScreen = 11;
        isAnimating = false;
        // startCustomScroll();
      }, '<+1.2').play();
  },
  1: () => {
    gsap.timeline({ paused: true })
      .add(stopCustomScroll)
      .add(() => params.isAnimating = true)
      .add(() => {
        scroller.scrollTo(document.querySelector('.screen1'))
      })
      .to('.screen1', {
        scale: 1
      }, '+1.5')
      .add(() => params.isAnimating = false)
      .add(stopCustomScroll)
      .add(() => {
        params.currentScreen = 1;
      })
      .play();
      
  },
};



const screen3VertLines = document.querySelectorAll('[data-screen3-side-line]');
screen3VertLines.forEach(el => {
  console.log(el);
  let result = fromPathToArray(el.getAttribute('d'));
  console.log(result);
  result[0].y = +result[0].y + (window.innerHeight - (+result[0].y));

  result[0].y -= 50;
  result = result.map(el => Object.values(el).join(' '));
  el.setAttribute('d',result.join(' '));
})



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
window.ttl = gsap.timeline( {
  defaults: {
    transformOrigin: '50% 50%',
    ease: 'none'
  },
  scrollTrigger: {
    scroller: pageContainer, //locomotive-scroll
    scrub: 1,
    trigger: ".screen8",
    pin: ".screen8__inner",
    start: "top top",
    end: `bottom ${window.innerHeight}px`,
    onEnter: () => {
      gsap.set(document.querySelectorAll('.screen8 img'), { willChange: 'transform' })
    },
    onLeave: () => {
      gsap.set(document.querySelectorAll('.screen8 img'), { willChange: '' })
    },
    onEnterBack: () => {
      gsap.set(document.querySelectorAll('.screen8 img'), { willChange: 'transform' })
    },
    onLeaveBack: () => {
      gsap.set(document.querySelectorAll('.screen8 img'), { willChange: '' })
    },
  },
  ease: "none"
})
// frame 1
// .set(gsap.utils.toArray(frames), { willChange: 'transform' })
.set(frames[1], { zIndex: 10 })
.to(frames[1], { 
  // scale: 1.7, 
  // x: getDistanceToScreenCenter(frames[1], 1.7).x, 
  yPercent: tl8IsMobile ? 60 : null,
  xPercent: tl8IsMobile ? -50 : null,
  top: tl8IsMobile ? null : '26%',
  scale: tl8IsMobile ? 2.08 : 1.7,
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
  transformOrigin: '100% 0',
},'<')
.to(frames[2], {
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
  scale: tl8IsMobile ? 2.85 :  1 / 0.49,
  x: () => {
    return getDistanceToScreenCenter(frames[2], 1.7).x;
  }, 
  yPercent: -50,
  top: '50%'
}, '+=1')
.to('[data-frame="1-1"]', { autoAlpha: 0, duration: 0.35 }, '<')
.to(frames[1], { 
  scale: 1 / 2.3, 
  xPercent: tl8IsMobile ? 0 : 62, 
  yPercent: tl8IsMobile ? -140 : -50,
  top: getDistanceToScreenCenter(frames[1]).initialTop 
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
  x: 0,
  y: 0,
  xPercent: tl8IsMobile ? -100 : 60,
  yPercent: tl8IsMobile ? 102 : 0,
  top: getDistanceToScreenCenter(frames[2]).initialTop
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
  transformOrigin: '0 0', 
}, '<')
.to(frames[5], { 
  xPercent: adaptiveScreen8Values(-177, -100),
  yPercent: adaptiveScreen8Values(88,-70),
  scale: 1 / 1.39,
}, '<')
//translate(-177%, 88%) scale(0.7194, 0.719424)
.to('[data-frame="1-4"]', { autoAlpha: 1, duration: 0.15 })
.addLabel('frame4');



!isMobile() && gsap.timeline({
  ease: 'none',
  scrollTrigger:  {
    scrub: true,
    scroller: pageContainer,
    markers: true,
    trigger: ".screen7",
    // start: "-200px bottom",
    end: `${innerHeight * 1.5} bottom`,
    // onLeave: () => {
    //   scroller.update();
    //   ScrollTrigger.refresh();
    // }
  }
})
.to('.screen5__inner', { 
  // x: innerHeight / -1,
  scale: 0.5,
  transformOrigin: '0 100%',
  duration: 5
})
.from('.screen7__inner', { yPercent: -30, xPercent: 70, scale: 2, transformOrigin: '0 0' }, '<+1.5')
// .to('.screen5__inner', {  scale: 0.75, xPercent: -30, yPercent: 80, transformOrigin: 'right top' }, '<');
gsap.timeline({
  ease: 'none',
  scrollTrigger:  {
    scrub: true,
    scroller: pageContainer,
    trigger: ".screen10",
    start: "80% bottom",
    end: '+=300px top',
    onLeave: () => {

    }
  }
})
.to('.right-bg', { width: '100vw'}, '<')




function getDistanceToScreenCenter(selector, scaleFactor = 0) {
  const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
  const currentOffsetOfSmoothScroll = scroller.scroll.instance.scroll.y;
  const { left, width, top } = el.getBoundingClientRect();
  const centerScreen = window.innerWidth / 2;
  const centerScreenY = window.innerHeight / 2;
  const xDistance = left - centerScreen;
  const yDistance = top - centerScreenY;
  // gsap.to(el, { x: xDistance, y: yDistance });
  return {
    x: xDistance * -1  - (width / 2),
    y: yDistance,
    initialTop: getComputedStyle(el).top,
  }
}

// getDistanceToScreenCenter(frames[1])
startCustomScroll()
// scroller.scrollTo(document.querySelector('.screen8'));


// console.log(getComputedStyle().getPropertyValue("--screen5-height"));
const screen5 = document.querySelector('.screen5');
const screen5Inner = document.querySelector('.screen5__inner');
const screen5ScaleCoef = isFullHd() ? 1 : 1.3;
screen5.style.setProperty('--screen5-height', innerWidth * screen5ScaleCoef + screen5Inner.getBoundingClientRect().height + 'px')

// console.log(isMobile());
const tl5scr = !isMobile() && gsap.timeline( {
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
.to(screen5Inner, { scale: isFullHd() ? 1.9 : 2.2, transformOrigin: '0 0', duration: 0 })
.to(screen5Inner, 
{
  x: innerWidth * -screen5ScaleCoef + 150,
  transformOrigin: '0 0',
}, '<')
.to(screen5Inner, { scale: 1, transformOrigin: '0 0', duration: 0.3, x: 0 })

if (isMobile()) {
  // document.querySelector('.screen5').style.height = document.querySelector('.screen5__inner-mobile').getBoundingClientRect().height + 'px';
}
isMobile() && gsap.timeline({
  ease: "none",
  scrollTrigger: {
    scroller: pageContainer,
    trigger: '.screen5',
    end: `100% bottom`,
    markers: false,
    scrub: 1,
    pin: '.screen5__inner-mobile',
    start: "top top",
    onLeave: () => {
      // gsap.to('.screen5__inner-mobile', { autoAlpha: 0 })
      console.log('fff');
    },
    onEnterBack: () => {
      // gsap.to('.screen5__inner-mobile', { autoAlpha: 1 })
    }
  }
})
.to('.screen5__inner-mobile', {
  // scale: 1,
  xPercent: -45,
  yPercent: -16.6,
  transformOrigin: '0 0',
  ease: 'none',
  // duration: 0.75,
})
.to('.screen5__inner-mobile', {
  // scale: 1,
  xPercent: 0,
  yPercent: -36.8,
  transformOrigin: '0 0',
  ease: 'none',
  // duration: 0.75,
})
.to('.screen5__inner-mobile', {
  scale: 0.5,
  yPercent: -60,
  xPercent: 0,
  transformOrigin: '0 100%',
  ease: 'none',
})



!isTablet() && gsap.timeline({
  ease: "none",
  scrollTrigger: {
    scroller: pageContainer,
    trigger: '.screen9',
    start: 'top top',
    end: `100% bottom`,
    // markers: false,
    scrub: 1,
    pin: '.screen9__inner',
    start: "top top",
    // onLeave: () => {
    //   // gsap.to('.screen5__inner-mobile', { autoAlpha: 0 })
    //   gsap.set('.map',{ willChange: '' })
    // },
    // onLeaveBack: () => {
    //   // gsap.to('.screen5__inner-mobile', { autoAlpha: 0 })
    //   gsap.set('.map',{ willChange: '' })
    // },
    // onEnter: () => {
    //   gsap.set('.map',{ willChange: 'transform' })
    //   // gsap.to('.screen5__inner-mobile', { autoAlpha: 1 })
    // },
    // onEnterBack: () => {
    //   gsap.set('.map',{ willChange: 'transform' })
    //   // gsap.to('.screen5__inner-mobile', { autoAlpha: 1 })
    // }
  }
})
.to('.screen9__inner>div', {
  ease: "none",
  scale: 1,

})

.to('.screen9__inner', {
  scale: 1
})
.fromTo('.map img', {

  scale: 1,
  willChange: 'auto'
}, { 
  ease: "none",
  scale: 1,
  willChange: 'transform'
}, '<')
.to('.screen9__inner', {
  scale: 1
})
.to('.screen9__inner', {
  scale: 1
})

function curtainOpen() {
  gsap.timeline()
    .set('.curtain', { display: 'block' })
    .fromTo('.curtain', { xPercent: 100 }, { xPercent: 0, duration: 0.75, ease: 'power2.out' })
}
function curtainClose() {
  gsap.timeline()
    .to('.curtain', { xPercent: -100, duration: 0.75, ease: 'power2.out' })
    .set('.curtain', { display: 'none' })
}


document.querySelectorAll('.nav__link').forEach(el => {
  el.addEventListener('click',function(evt){
    evt.preventDefault();
    console.log();
    gsap.timeline()
      .add(curtainOpen)
      .add(() => {
        scroller.scrollTo(document.querySelector(el.getAttribute('href')))
      }, '<+1.5')
      .add(curtainClose, '<+1.5')
  });
})
window.curtainOpen = curtainOpen;
window.curtainClose = curtainClose;
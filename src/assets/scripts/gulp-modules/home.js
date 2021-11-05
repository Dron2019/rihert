import {gsap, ScrollTrigger} from 'gsap/all';
// import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

global.gsap = gsap;
gsap.registerPlugin(ScrollTrigger);

const screen1 = document.querySelector('.screen1');
screen1.transformed = false;
window.addEventListener('click',function(evt){
    screen1.transformed = !screen1.transformed;
    screen1.transformed === true ? enableScroll() : disableScroll();
    gsap.to('.screen1', {
        scale: () => screen1.transformed ? 5 : 1,
        ease: 'power4.out',
        duration: 2.5
    })
});



// const horScroll = new LocomotiveScroll({
//     el: document.querySelector('.screen4-horizontal'),
//     direction: 'horizontal',
//     // gestureDirection: 'horizontal',
//     smooth: true,
//     resetNativeScroll: false,
// });



// ScrollTrigger.create({
//     trigger: '.screen4-horizontal-wrapper',
//     start: "top top",
//     scrub: 1,
//     // end: '+=2000 top',
//     // scrub: 0.1,
//     // scrub: true,
//     pin: true,
//     markers: true,
//     snap: true,
//     onUpdate: ({progress}) => {
//         console.log(progress);
//     },
//     onEnter: () => {
//         console.log('eee');
//     }
    
// })

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

disableScroll();
const pageContainer = document.querySelector(".scroller-container");

/* SMOOTH SCROLL */
const scroller = new LocomotiveScroll({
  el: pageContainer,
  smooth: true,
  smoothMobile: false,
  // inertia: 1.1,
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
  pinType: pageContainer.style.transform ? "transform" : "fixed"
});

////////////////////////////////////
////////////////////////////////////

  let pinBoxes = document.querySelectorAll(".pin-wrap > *");
  let pinWrap = document.querySelector(".pin-wrap");
  let pinWrapWidth = pinWrap.offsetWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;

  // Pinning and horizontal scrolling

  gsap.to(".pin-wrap", {
    scrollTrigger: {
      scroller: pageContainer, //locomotive-scroll
      scrub: true,
      trigger: "#sectionPin",
      pin: true,
      // anticipatePin: 1,
      start: "top top",
      end: pinWrapWidth,
        onUpdate: () => {
            console.log('ddd');
        },
        onEnterBack: () => {
            // gsap.to('.pin-wrap', { scale: 1 })
        },
        onLeave: () => {
            /*gsap.timeline().to('.pin-wrap', { scale: 0.5, duration: 2.5, ease: 'power4.out' })
            .from('.screen5', { scale: 2.5, duration: 2.5, ease: 'power4.out' }, '<')*/
        }
    },
    x: -horizontalScrollLength,
    ease: "none"
  });
  // .fromTo('.screen5', { scale: 2.5 }, { scale: 1 })
  gsap.timeline({
    scrollTrigger: {
      scroller: pageContainer, //locomotive-scroll
      scrub: true,
      start: `top top`,
      trigger: "#sectionPin",
      end: pinWrapWidth + 1000,
    }
  })
  .fromTo('.screen5', { scale: 2.5 }, { scale: 1 })

gsap.timeline({
  scrollTrigger: {
    scroller: pageContainer,
    trigger: '.screen5',
    scrub: true,
    onUpdate: ({progress}) => console.log(progress)
  }
}).fromTo('.pin-wrap', { scale: 1 }, { scale: 0 })
gsap.timeline({
  scrollTrigger: {
    scroller: pageContainer,
    trigger: '.screen6',
    scrub: true,
    onUpdate: ({progress}) => console.log(progress)
  }
}).fromTo('.screen7__inner', { xPercent: 50, yPercent: 50 }, { xPercent: 0, yPercent: 0 }, '<')


gsap.timeline({
  scrollTrigger: {
    scroller: pageContainer,
    trigger: '.screen7',
    scrub: true,
    onUpdate: ({progress}) => console.log(progress)
  }
}).fromTo('.screen6', { scale: 1 }, { scale: 0.5 })


const screen9 = document.querySelector('.screen9');
// 0.28
gsap.set(screen9, { scale: 3.4, transformOrigin: 'top left' })
const tl9 = gsap.timeline().fromTo(screen9, { scale: 1 }, { scale: 3.4 });
screen9.addEventListener('click',function(evt){
  screen9.transformed = !screen9.transformed;
  screen9.transformed ?
    tl9.play() :
    tl9.reverse();
});

ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll
ScrollTrigger.refresh();





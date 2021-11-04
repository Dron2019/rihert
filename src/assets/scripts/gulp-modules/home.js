import {gsap, ScrollTrigger} from 'gsap/all';
// import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';


gsap.registerPlugin(ScrollTrigger);

const screen1 = document.querySelector('.screen1');
screen1.transformed = false;
window.addEventListener('click',function(evt){
    screen1.transformed = !screen1.transformed;
    gsap.to('.screen1', {
        scale: () => screen1.transformed ? 1 : 2.5,
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


const pageContainer = document.querySelector(".page__inner");

/* SMOOTH SCROLL */
const scroller = new LocomotiveScroll({
  el: pageContainer,
  smooth: true
});

scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(document.body, {
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
            gsap.to('.pin-wrap', { scale: 1 })
        },
        onLeave: () => {
            gsap.timeline().to('.pin-wrap', { scale: 0.5, duration: 2.5, ease: 'power4.out' })
            .from('.screen5', { scale: 2.5, duration: 2.5, ease: 'power4.out' }, '<')
        }
    },
    x: -horizontalScrollLength,
    ease: "none"
  });
//   ScrollTrigger.create({
//     trigger: '.screen5',
//     onEnter: () => {

//       console.log('ffff');
        
//     }
// })
  ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll

  ScrollTrigger.refresh();




import {gsap, ScrollTrigger} from 'gsap/all';
import { param } from 'jquery';
// import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

import screen9Handler from './home/screen9';

global.gsap = gsap;

gsap.defaults({
  ease: 'power3.out',
  duration: 2.5,
})
gsap.registerPlugin(ScrollTrigger);

// const screen1 = document.querySelector('.screen1');
// screen1.transformed = false;
// window.addEventListener('click',function(evt){
//     screen1.transformed = !screen1.transformed;
//     // screen1.transformed === true ? enableScroll() : disableScroll();
//     gsap.to('.screen1', {
//         scale: () => screen1.transformed ? 5 : 1,
//         ease: 'power4.out',
//         duration: 2.5
//     })
// });
// const changeScreen = new CustomEvent('screenChange', {  });



// window.addEventListener('wheel',() => {
//   console.log(params.screen);
// })



window.screen1To2Tl = gsap.timeline({ paused: true })
  .add(startCustomScroll)
  .to('.screen1', { scale: 2.05 })
  .add(() => {
    scroller.scrollTo(document.querySelector('.screen2'))
  })
  // .add(startCustomScroll)


window.screen2To1Tl = gsap.timeline({ paused: true })
  .add(startCustomScroll)
  .add(() => {
    scroller.scrollTo(document.querySelector('.screen1'))
  })
  .to('.screen1', {
    scale: 1
  }, '+1.5')
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



gsap.timeline({
  scrollTrigger: {
    trigger: '.screen1',
    scroller: pageContainer,
    onEnterBack: () => {
      // params[1]();
    }
  }
})
gsap.timeline({
  scrollTrigger: {
    trigger: '.screen2',
    scroller: pageContainer,
    start: '-20px bottom',
    onEnter: () => {
      gsap.timeline()
        .add(stopCustomScroll)
        // .to('.screen1', { scale: 2.5 })
        .add(() => {
          // scroller.scrollTo(document.querySelector('.screen2'))
        })
        .add(startCustomScroll, '+0.5')
    },
    // onLeaveBack: () => {
    //   gsap.timeline()
    //     .add(stopCustomScroll)
    //     .to('.screen1', { scale: 1 })
    //     .add(startCustomScroll, '+0.5')
    // }
  }
})


function stopCustomScroll() {
  scroller.stop();
}
function startCustomScroll() {
  scroller.start();
}
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
            // console.log('ddd');
        },
        onLeave: () => {
          // params[5]()
        },
        onEnterBack: () => {
          // params[4]()
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
      end: pinWrapWidth,
      onEnterBack: () => {
        console.log('ENTERBACK');
      }
    }
  })
  // .fromTo('.screen5', { scale: 2.5 }, { scale: 1 })

gsap.timeline({
  scrollTrigger: {
    scroller: pageContainer,
    trigger: '.screen5',
    scrub: true,
    
    // onUpdate: ({progress}) => console.log(progress)
  }
})
gsap.timeline({
  scrollTrigger: {
    scroller: pageContainer,
    trigger: '.screen6',
    scrub: true,
    // onUpdate: ({progress}) => console.log(progress)
    onEnterBack: () => {
      console.log('enterBackTo6');
      // params[6]();
    }
  }
})


gsap.timeline({
  scrollTrigger: {
    scroller: pageContainer,
    trigger: '.screen7',
    scrub: true,
    // onEnter: () => /*params[7]()*/
  }
})
gsap.timeline({
  scrollTrigger: {
    scroller: pageContainer,
    trigger: '.screen9',
    scrub: true,
    onEnter: () => {
      // params[9]()
      console.log('enter 9');
    },
    onEnterBack: () => {
      console.log('enter back 9');
      params[9]('fromBack')

    }
  }
})
gsap.timeline({
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
gsap.timeline({
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


const screen9 = document.querySelector('.screen9 .screen7__inner');
// 0.28
gsap.set(screen9, { scale: 3.4, transformOrigin: 'top left' })
// const tl9 = gsap.timeline().fromTo(screen9, { scale: 1 }, { scale: 3.4 });
// screen9.addEventListener('click',function(evt){
//   screen9.transformed = !screen9.transformed;
//   screen9.transformed ?
//     tl9.play() :
//     tl9.reverse();
// });

ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll
ScrollTrigger.refresh();

stopCustomScroll();

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
  2: () => {
    gsap.timeline({ paused: true })
      .add(stopCustomScroll)
      .add(() => params.isAnimating = true)
      .to('.screen1', { scale: 2.05 })
      .add(() => {
        scroller.scrollTo(document.querySelector('.screen2'))
      })
      .add(() => params.isAnimating = false)
      .add(startCustomScroll)
      .add(() => {
        params.currentScreen = 2;
      })
      .play();
  },
  3: () => {
    
  },
  4: () => {
    gsap.timeline()
      .add(stopCustomScroll)
      .add(() => {
        params.isAnimating = true;
      })
      .fromTo('.screen5', { scale: 1 }, { scale: 2.5 })
      .fromTo('.pin-wrap', { scale: 0.415 }, { scale: 1 }, '<')
      // .fromTo('.screen2', { y: '174vh' }, { y: '0' }, '<')
      .add(() => {
        params.currentScreen = 4;
        params.isAnimating = false;
      })
      .add(startCustomScroll, '<+0.5')
      /*gsap.timeline().to('.pin-wrap', { scale: 0.5, duration: 2.5, ease: 'power4.out' })
      .from('.screen5', { scale: 2.5, duration: 2.5, ease: 'power4.out' }, '<')*/
  },
  5: () => {
    gsap.timeline()
      // .add(() => scroller.stop())
      .add(() => stopCustomScroll())

      .add(() => {
        
        params.isAnimating = true;
      })
      .fromTo('.screen5', { scale: 2.5 }, { scale: 1 })
      .fromTo('.pin-wrap', { scale: 1 }, { scale: 0.415 }, '<')
      // .fromTo('.screen2', { y:  '0'}, { y:'174vh'  }, '<')
      .add(() => scroller.scrollTo(document.querySelector('.screen5')), '<')
      .add(() => {
        
        params.currentScreen = 5;
      })
      .add(() => {
        startCustomScroll();
        params.isAnimating = false;
      })
  },
  6: () => {
    const screen6Height = document.querySelector('.screen6').getBoundingClientRect().height;
    console.log('ee');
    gsap.timeline()
        .add(() => {
          stopCustomScroll();
          params.isAnimating = true;
        })
        // .fromTo('.screen6', { height: screen6Height }, { height: screen6Height * 2, duration: 2.5 }, '<')
        .add(() => scroller.scrollTo(document.querySelector('.screen6')))
        // .fromTo('.screen6', { height: '50vh' }, { height: '100vh', duration: 2.5 }, '<')
        .fromTo('.screen6__inner', { scale: 0.5 }, { scale: 1, duration: 2.5 }, '<')
        .fromTo('.screen7__inner', {xPercent: 0 }, { xPercent: 100, duration: 2.5 }, '<')
        // .set('.screen6', { minHeight: 'auto' })
        .add(() => {
          startCustomScroll();
          scroller.update();
          params.currentScreen = 6;
          params.isAnimating = false;
        })
  },
  7: () => {
    const screen6Height = document.querySelector('.screen6').getBoundingClientRect().height;
    gsap.timeline()
        .add(() => {
          stopCustomScroll();
          params.isAnimating = true;
        })
        .add(() => scroller.scrollTo(document.querySelector('.screen7')))
        
        // .set('.screen6', { minHeight: 'auto' })
        // .fromTo('.screen6', { height: screen6Height }, { height: screen6Height / 2, duration: 2.5 }, '<')
        .fromTo('.screen6__inner', { scale: 1 }, { scale: 0.5, duration: 2.5 })
        .fromTo('.screen7__inner', { xPercent: 100 }, {xPercent: 0, duration: 2.5 }, '<')
        .add(() => {
          startCustomScroll();
          scroller.update();
          params.currentScreen = 7;
          params.isAnimating = false;
        })
  },
  8: () => {
    
  },
  9: (fromBack) => {
    let isAnimating = true;
    let innerState = fromBack ? 2 : 1;
    // stopCustomScroll();
    gsap.timeline({paused: true})
      .add(stopCustomScroll)
      .add(() => {
        params.isAnimating = true;
        scroller.scrollTo(document.querySelector('.screen9'));
      })
      .add(() => {
        isAnimating = false;
      }, '<+1.5')
      .play();
      window.addEventListener('wheel', innerScreen9Handler);
      function innerScreen9Handler(evt) {
        if (isAnimating === true) return;
        if (evt.deltaY > 0 && innerState === 1) {
          transferInnerDown9().play();
          innerState++;
        } else if (evt.deltaY > 0 && innerState === 2) {
          transferFrom9().play();
        } else if (evt.deltaY < 0 && innerState === 2) {
          transferInnerUp().play();
          innerState--;
        } else if (evt.deltaY < 0 && innerState === 1) {
          transferFrom9Up().play();
        }
      }
      // let it = setInterval(() => {
      //   console.log(isAnimating);
      // }, 500);
      function transferFrom9Up() {
        console.log('Leave 9 Up');
        // clearInterval(it);
        return gsap.timeline({ paused: true })
          .add(() => isAnimating = true)  
          .add(() => {
              window.removeEventListener('wheel', innerScreen9Handler);
          })
          .add(() => {
            scroller.scrollTo(document.querySelector('.screen8'));
            // startCustomScroll();
            scroller.update();
            params.currentScreen = 8;
          }) 
          .add(() => isAnimating = false)  
          .add(startCustomScroll)
      }
      function transferInnerUp() {
        return gsap.timeline({ paused: true })
          .add(() => isAnimating = true)
          .to('.screen9 .screen7__inner', { scale: 4 })
         
          .add(() => isAnimating = false)
        }
      function transferInnerDown9(){
        return gsap.timeline({ paused: true })
          .add(() => isAnimating = true)
          .to('.screen9 .screen7__inner', { scale: 1 })
          .add(() => isAnimating = false)

      }
      function transferFrom9() {
        return gsap.timeline({ paused: true })
          .add(() => isAnimating = true)  
          .add(() => {
              window.removeEventListener('wheel', innerScreen9Handler);
              scroller.scrollTo(document.querySelector('.screen10'));
              scroller.update();
          })
          .add(() => isAnimating = false)  
          .add(startCustomScroll)
          .add(() => {
            params[10]()
          })
          // .add(startCustomScroll)
      }
  },
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
        .to('.screen11 img', { scale: 1.5 })
        .add(() => {
          currentState = 2;
        })
        .add(() => isAnimating = false)
    }
    function switchState2To1(){
      return gsap.timeline({ paused: true })
        .add(() => isAnimating = true)
        .to('.screen11 img', { scale: 1 })
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
function changeCurrentScreen(evt) {
  if (params.isAnimating || params.excludeScreenOnScrollChange.includes(params.currentScreen)) return;
  const direction = evt.deltaY / 100;
  const currentScreenNumber = +params.currentScreen;
  if (typeof params[currentScreenNumber + direction] === 'function') {
    params[currentScreenNumber + direction]();
    params.currentScreen += direction;
  }
  console.log(params.currentScreen);
}
window.addEventListener('wheel',changeCurrentScreen);






scroller.scrollTo(document.querySelector('.screen10'));



console.log(document.querySelector('[data-screen3-first-svg-line]'));

const PATH_COMMANDS = {
  M: ["x", "y"],
  m: ["dx", "dy"],
  H: ["x"],
  h: ["dx"],
  V: ["y"],
  v: ["dy"],
  L: ["x", "y"],
  l: ["dx", "dy"],
  Z: [],
  C: ["x1", "y1", "x2", "y2", "x", "y"],
  c: ["dx1", "dy1", "dx2", "dy2", "dx", "dy"],
  S: ["x2", "y2", "x", "y"],
  s: ["dx2", "dy2", "dx", "dy"],
  Q: ["x1", "y1", "x", "y"],
  q: ["dx1", "dy1", "dx", "dy"],
  T: ["x", "y"],
  t: ["dx", "dy"],
  A: ["rx", "ry", "rotation", "large-arc", "sweep", "x", "y"],
  a: ["rx", "ry", "rotation", "large-arc", "sweep", "dx", "dy"]
};

function fromPathToArray(path) {
  const items = path.replace(/[\n\r]/g, '').
                replace(/-/g, ' -').
                replace(/(\d*\.)(\d+)(?=\.)/g, '$1$2 ').
                trim().
                split(/\s*,|\s+/);
  const segments = [];
  let currentCommand = '';
  let currentElement = {};
  while (items.length > 0){
    let it = items.shift();
    if (PATH_COMMANDS.hasOwnProperty(it)){
      currentCommand = it;
    }
    else{
      items.unshift(it);
    }
    currentElement = {type: currentCommand};
    PATH_COMMANDS[currentCommand].forEach((prop) => {
      it = items.shift();  // TODO sanity check
      currentElement[prop] = it;
    });
    if (currentCommand === 'M'){
      currentCommand = 'L';
    }
    else if (currentCommand === 'm'){
      currentCommand = 'l';
    }
    segments.push(currentElement);
  }
  return segments
}


(function (){

  const screen3FirstSvgPath = document.querySelector('[data-screen3-bottom-line]');
const d = screen3FirstSvgPath.getAttribute('d');
let result = fromPathToArray(d);
result.forEach(el => {
  const svg = screen3FirstSvgPath.closest('svg');
  const svgSideDiscrepancy = svg.getBoundingClientRect().width / svg.getBoundingClientRect().height;
  el.y = +el.y + (window.innerHeight - (+el.y));
  el.y -= (el.y * 0.1);
})
result = result.map(el => Object.values(el).join(' '));

screen3FirstSvgPath.setAttribute('d',result.join(' ') );
})()


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
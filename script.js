function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);


// --- SETUP START ---
// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, {duration: 0, disableLerp: true}) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.defaults({ scroller: "#main" });
ScrollTrigger.refresh();


}
locoScroll()

function cursorEffect(){
    var page1Content = document.querySelector("#page1-content")
var cursor = document.querySelector("#cursor")
page1Content.addEventListener("mousemove", function(dets){
    gsap.to(cursor, {
        x: dets.x,
        y: dets.y,
        
    })
})

page1Content.addEventListener("mouseenter",function(){
    gsap.to(cursor, {
        scale: 1,
        opacity: 1
    })
})

page1Content.addEventListener("mouseleave",function(){
    gsap.to(cursor, {
        scale: 0,
        opacity: 0
    })
})
}

cursorEffect()

var tl=gsap.timeline()
tl.from("#loader h3",{
    x:40,
    opacity: 0,
    duration: 1,
    stagger: 0.1
})
tl.to("#loader h3",{
    opacity: 0,
    x: -10,
    duration: 1,
    stagger: 0.1,
})
tl.to("#loader",{
    opacity: 0,
})

tl.from("#page1-content h1 span", {
    y: 100,
    opacity: 0,
    duration: 0.1,
    stagger: 0.1,
    delay: 0.5
})

tl.to("#loader",{
    display: "none"
})


// GSAP navbar animation
const menuBtn = document.querySelector("#page1 nav h4");
const fullNav = document.querySelector("#full-nav");
const closeBtn = document.querySelector("#close-nav");

// Show full nav
menuBtn.addEventListener("click", () => {
  gsap.to("#full-nav", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power4.out",
    pointerEvents: "auto"
  });
});

// Hide full nav
closeBtn.addEventListener("click", () => {
  gsap.to("#full-nav", {
    y: "-100%",
    opacity: 0,
    duration: 0.8,
    ease: "power4.in",
    pointerEvents: "none"
  });
});

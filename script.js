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


function gsapNavbarAnimation() {
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

}
gsapNavbarAnimation()


function gsapcardAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Scroll Reveal
  gsap.from(".portfolio-card", {
    scrollTrigger: {
      trigger: ".portfolio-cards",
      start: "top 80%",
      scroller: "#page10", // 🔥 This line is the missing link
    },
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.2
  });

  // Hover Elastic Zoom
  document.querySelectorAll(".portfolio-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.04,
        duration: 0.4,
        ease: "elastic.out(1, 0.4)"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Optional: Image zoom on hover
  document.querySelectorAll(".portfolio-card img").forEach(img => {
    img.addEventListener("mouseenter", () => {
      gsap.to(img, { scale: 1.1, duration: 0.5, ease: "power2.out" });
    });
    img.addEventListener("mouseleave", () => {
      gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.inOut" });
    });
  });
}


gsapcardAnimation()



// 👇 Add this once GSAP and TextPlugin are loaded
gsap.registerPlugin(TextPlugin);

function setupPricingSwitcher() {
  const toggleButtons = document.querySelectorAll(".pricing-toggle button");

  toggleButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Toggle active class
      toggleButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Decide between monthly/yearly
      const type = index === 0 ? "monthly" : "yearly";

      // Loop over all pricing cards and update
      document.querySelectorAll(".pricing-card").forEach(card => {
        const priceEl = card.querySelector(".plan-price");
        const durationEl = card.querySelector(".plan-duration");

        const newPrice = priceEl.dataset[type];
        const newDuration = durationEl.dataset[type];

        // Animate price text
        gsap.to(priceEl, {
          textContent: `$${newPrice}`,
          duration: 0.5,
          ease: "power2.out",
        });

        // Animate duration
        gsap.to(durationEl, {
          textContent: newDuration,
          duration: 0.4,
          ease: "power1.out"
        });
      });
    });
  });
}

setupPricingSwitcher();


function pricingCardHoverEffects() {
  document.querySelectorAll(".pricing-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.05,
        boxShadow: "0 16px 32px rgba(0, 0, 0, 0.15)",
        duration: 0.3,
        ease: "power2.out"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
}
pricingCardHoverEffects();


function pricingCardHoverTheme() {
  document.querySelectorAll(".pricing-card").forEach(card => {
    const textEls = card.querySelectorAll(".plan-price, .plan-duration, .plan-features li, .choose-plan");

    card.addEventListener("mouseenter", () => {
      // Animate background to black
      gsap.to(card, {
        backgroundColor: "#282834",
        duration: 0.4,
        ease: "power2.out"
      });

      // Animate text to white
      gsap.to(textEls, {
        color: "#fff",
        duration: 0.3,
        ease: "power1.out"
      });

      // Optional: button background
      const button = card.querySelector(".choose-plan");
      gsap.to(button, {
        backgroundColor: "#fff",
        color: "#000",
        duration: 0.3,
        ease: "power1.out"
      });
    });

    card.addEventListener("mouseleave", () => {
      // Animate background back to white
      gsap.to(card, {
        backgroundColor: "#fff",
        duration: 0.4,
        ease: "power2.out"
      });

      // Animate text back to original
      gsap.to(textEls, {
        color: "#23232b", // or your original text color
        duration: 0.3,
        ease: "power1.out"
      });

      // Restore button too
      const button = card.querySelector(".choose-plan");
      gsap.to(button, {
        backgroundColor: "#d7264b",
        color: "#fff",
        duration: 0.3,
        ease: "power1.out"
      });
    });
  });
}

pricingCardHoverTheme();

function magneticFooterLogo() {
  const logo = document.querySelector(".footer-logo h2");

  if (!logo) return;

  logo.addEventListener("mousemove", (e) => {
    const rect = logo.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(logo, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: "power3.out",
    });
  });

  logo.addEventListener("mouseleave", () => {
    gsap.to(logo, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "elastic.out(1, 0.4)",
    });
  });
}

magneticFooterLogo();


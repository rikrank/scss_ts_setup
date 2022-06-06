import SmoothScroll from "smooth-scroll";

const smoothScroll = new SmoothScroll('a[href*="#"]', {
  speed: 1250,
  speedAsDuration: true,
  easing: "easeInOutQuint",
  offset: 80,
});

export { smoothScroll };

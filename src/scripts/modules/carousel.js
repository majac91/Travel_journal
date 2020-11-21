let slideContainer;
let nextBtn;
let prevBtn;
let interval;
let slides;
let index;
let slideWidth;
let firstClone;
let lastClone;
let startInterval;

function cacheDom() {
  slideContainer = document.querySelector(".slides");
  nextBtn = document.querySelector(".next-btn");
  prevBtn = document.querySelector(".prev-btn");
  interval = 5000;
  slides = document.querySelectorAll(".slide");
  index = 0;
  slideWidth = slides[index].clientWidth || window.onresize;
  firstClone = slides[0].cloneNode(true);
  lastClone = slides[slides.length - 1].cloneNode(true);
  startInterval = setInterval(moveToNextSlide, interval);
}

function bindEvents() {
  slideContainer.addEventListener("transitionend", () => {
    slides = getSlides();
    if (slides[index] === firstClone) {
      slideContainer.style.transition = "none";
      index = 1; //resetting the index and the slideWidth back to the first slide
      slideContainer.style.transform = `translateX(${-slideWidth * index}px)`;
    }

    if (slides[index] === lastClone) {
      slideContainer.style.transition = "none";
      index = slides.length - 2;
      slideContainer.style.transform = `translateX(${-slideWidth * index}px)`;
    }
  });
  nextBtn.addEventListener("click", () => {
    clearInterval(startInterval);
    startInterval = setInterval(moveToNextSlide, interval);
  });
  prevBtn.addEventListener("click", moveToPreviousSlide);
}

function render() {
  slideContainer.append(firstClone);
  slideContainer.prepend(lastClone);
}

//slides resize on window change
window.onresize = function () {
  slideWidth = slides[index].clientWidth;
  return slideWidth;
};

//includes the first and the last clone
const getSlides = () => document.querySelectorAll(".slide");

function moveToNextSlide() {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  slideContainer.style.transition = ".7s ease-out";
  slideContainer.style.transform = `translateX(${-slideWidth * index}px)`; //the index increases so the amount amount a slide is transitioned increases
}

function moveToPreviousSlide() {
  if (index <= 0) return;
  index--;
  slideContainer.style.transition = ".7s ease-out";
  slideContainer.style.transform = `translateX(${-slideWidth * index}px)`;
}

function init() {
  cacheDom();
  bindEvents();
  render();
}
init();

export default module;
